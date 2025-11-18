import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieInfo from "../MovieInfo";


describe("MOvieInfo Component", () => {
    const mockProps = {
        title: "Inception",
        overview: "A skilled thief who steals corporate secrets through dream-sharing technology.",
    };

    it("Should render without crashing", () => {
        render(<MovieInfo {...mockProps} />);

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("Should display the title properly", () => {
        render(<MovieInfo {...mockProps} />);

        const titleElement = screen.getByRole("heading", { level: 1 })
        expect(titleElement).toHaveTextContent("Inception");
    });


    it("Should display the overview properly", () => {
        render(<MovieInfo {...mockProps} />);

        const overViewElement = screen.getByText("A skilled thief who steals corporate secrets through dream-sharing technology.");
        expect(overViewElement).toBeInTheDocument();
    });

    it("should render Play Trailer button", () => {
        render(<MovieInfo />);
        const playTrailerButton = screen.getByRole("button", { name: /play trailer/i });
        expect(playTrailerButton).toBeInTheDocument();
    });

    it("should render More Info button", () => {
        render(<MovieInfo />);
        const moreInfoButton = screen.getByRole("button", { name: /more info/i });
        expect(moreInfoButton).toBeInTheDocument();
    })

});