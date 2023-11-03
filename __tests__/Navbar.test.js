import { render } from "@testing-library/react";
import Navbar from "@/app/components/Navbar";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
  usePathname() {
    return jest.fn().mockImplementation(() => "/");
  },
  useSearchParams() {
    return {};
  },
}));

jest.mock("../app/components/NavMobile", () => {
  const mockNavMobile = () => {
    return "";
  };
  return mockNavMobile;
});

test("renders Navbar after logged in", async () => {
  jest
    .spyOn(React, "useState")
    .mockImplementation(() => [false, () => null])
    .mockImplementation(() => [false, () => null])
    .mockImplementation(() => [true, () => null])
    .mockImplementation(() => [true, () => null]);
  const { findByText } = render(<Navbar />);
  const elementLogout = await findByText(/Logout/i);
  expect(elementLogout).toBeInTheDocument();
});
