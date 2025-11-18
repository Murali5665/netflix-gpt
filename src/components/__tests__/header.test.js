import { render, screen } from "@testing-library/react";
import { Navigate, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header"
import { handleSignOut } from "../../utils/userAuthentication";
import { addUser } from "../../utils/userSlice";


// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    // pretend a user is logged in for tests that expect auth-dependent UI
    callback({ uid: "test-user", email: "test@example.com" });
    return () => { };  // return unsubscribe function
  })
}))

jest.mock("../../utils/firebase", () => ({
  auth: {},
}));

jest.mock("../../utils/userAuthentication", () => ({
  handleSignOut: jest.fn(),
}))

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


const customRender = (ui) => {
  return render(
    <Provider store={appStore}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  )
}

describe("Render header page", () => {

  it("Should render image", () => {
    customRender(<Header />);

    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()
  });

  it("Signout Button Test", () => {
    customRender(<Header />);

    const singoutButton = screen.getByRole("button", { name: /sign Out/i });
    expect(singoutButton).toBeInTheDocument()
  });
});

describe("Gpt toggle test", () => {

  it("should toggle from Gpt search to home", async () => {
    customRender(<Header />);
    const user = userEvent.setup()

    const toggleGptButton = screen.getByRole("button", { name: /GPT Search/i });
    expect(toggleGptButton).toBeInTheDocument();

    await user.click(toggleGptButton);
    expect(screen.getByRole("button", { name: /Home/i }))
  });
});

describe("Header Sign Out Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // insert a user into Redux store so Sign Out button appears
    appStore.dispatch(
      addUser({
        uid: "1",
        email: "test@test.com",
        displayName: "Test User",
      })
    );
  });

  it("should call handleSignOut when clicking Sign Out", async () => {
    const user = userEvent.setup();
    customRender(<Header />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    await user.click(signOutButton);

    expect(handleSignOut).toHaveBeenCalled();
  });

  it("should navigate to '/' after clicking Sign Out", async () => {
    const user = userEvent.setup();
    customRender(<Header />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    await user.click(signOutButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should remove user from Redux store after Sign Out", async () => {
    const user = userEvent.setup();
    customRender(<Header />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    await user.click(signOutButton);

    const state = appStore.getState().user;
    expect(state).toBeNull();  // after removeUser()
  });

  it("should handle errors thrown by handleSignOut without crashing", async () => {
    const user = userEvent.setup();

    handleSignOut.mockImplementation(() => {
      throw new Error("Sign-out error");
    });

    customRender(<Header />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    await user.click(signOutButton);

    // Component should NOT crash
    expect(signOutButton).toBeInTheDocument();
  });

});