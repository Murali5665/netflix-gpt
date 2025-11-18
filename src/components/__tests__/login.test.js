import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Login from "../Login";
import { validateCreds, userSignUp, userLogin } from "../../utils/userAuthentication";


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
    callback(null);   // pretend user is logged out
    return () => { };  // return unsubscribe function
  })
}));

jest.mock("../../utils/userAuthentication", () => ({
  validateCreds: jest.fn(),
  userLogin: jest.fn(),
  userSignUp: jest.fn(),
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

describe("Login Input Fields", () => {

  it("Should render password input", () => {
    customRender(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    //assertion
    expect(passwordInput).toBeInTheDocument();
  });


  it("Should render email input", () => {
    customRender(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);

    //assertion
    expect(emailInput).toBeInTheDocument();
  });

  it("Should update email input on change", async () => {
    customRender(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const user = userEvent.setup();

    await user.type(emailInput, "test@example.com");

    expect(emailInput.value).toBe("test@example.com")
  });

  it("Should update password input on change", async () => {
    customRender(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const user = userEvent.setup();

    await user.type(passwordInput, "password@123");

    expect(passwordInput.value).toBe("password@123")

  });
});


describe("Login Button and toggle Tests", () => {

  it("Should render sign in button", () => {
    customRender(<Login />);

    const signINbutton = screen.getByRole("button", { name: /sign in/i });
    expect(signINbutton).toBeInTheDocument();

  });

  it("Should handle form submission", async () => {
    validateCreds.mockReturnValue({ message: null });
    userLogin.mockReturnValue({ message: null });
    customRender(<Login />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    const user = userEvent.setup();

    await user.click(signInButton);

    // Test is simple here… Sign In button still exists
    expect(signInButton).toBeInTheDocument();
  });

  it("Should toggle from Sign in to Sign up on button Click", async () => {
    const user = userEvent.setup();
    customRender(<Login />);

    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();

    const toggleLink = screen.getByText(/new to netflix\? sign up now/i);
    expect(toggleLink).toBeInTheDocument();

    await user.click(toggleLink);

    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/switch to sign in/i)).toBeInTheDocument();
  })

});

describe("Login Form submit tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should show error when validateCreds fails", async () => {

    validateCreds.mockReturnValue({ message: "Invalid email" });

    customRender(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "bademail");
    await user.type(screen.getByPlaceholderText(/password/i), "test123");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });


  it("should show error message when userLogin returns error", async () => {
    validateCreds.mockReturnValue({ message: null });
    userLogin.mockReturnValue({ message: "Wrong password" });

    customRender(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "test@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "Password123");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText(/wrong password/i)).toBeInTheDocument();
  });

  it("should call userLogin when Sign In mode and no validation errors", async () => {
    validateCreds.mockReturnValue({ message: null });
    userLogin.mockReturnValue({ message: null });

    customRender(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "test@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "Password123");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(userLogin).toHaveBeenCalledWith("test@test.com", "Password123");
  });


  it("should show Sign Up inputs when toggled", async () => {
    customRender(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByText(/sign up now/i));

    // Sign Up mode should show Name input
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("should call userSignUp with correct inputs", async () => {
    validateCreds.mockReturnValue({ message: null });
    userSignUp.mockReturnValue({ message: null });

    customRender(<Login />);
    const user = userEvent.setup();

    // Switch to Sign Up
    await user.click(screen.getByText(/sign up now/i));

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@test.com");
    await user.type(passwordInput, "Password123");

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(userSignUp).toHaveBeenCalledWith(
      "John Doe",
      "john@test.com",
      "Password123"
    );
  });


  it("should show userSignUp error message", async () => {
    validateCreds.mockReturnValue({ message: null });
    userSignUp.mockReturnValue({ message: "User already exists" });

    customRender(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByText(/sign up now/i));

    await user.type(screen.getByPlaceholderText(/name/i), "John");
    await user.type(screen.getByPlaceholderText(/email/i), "john@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "Password123");

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText(/user already exists/i)).toBeInTheDocument();
  });
});
