import { render, screen } from "@testing-library/react";
import { Navigate, BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header"



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

// Mock firebase config
jest.mock("../../utils/firebase", () => ({
  auth: {},
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

describe("Singout button test", () => {

  it("should signout user", async () =>{
    customRender(<Header/>);

    const signOutButton = screen.getByRole("button", { name: /sign out/i});
    expect(signOutButton).toBeInTheDocument();

    // await user.click(singoutButton);

    // expect(/).





  });
});