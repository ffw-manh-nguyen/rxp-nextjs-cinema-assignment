import {
  findByText,
  findByTitle,
  fireEvent,
  render,
} from "@testing-library/react";
import Login, { RedirectToHome } from "../app/login/page";
import "@testing-library/jest-dom";
import React from "react";
import { useRouter } from "next/navigation";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: () => ({
    handleSubmit: () => jest.fn(),
    register: jest.fn(),
    control: {
      register: jest.fn(),
      unregister: jest.fn(),
      getFieldState: jest.fn(),
      _names: {
        array: new Set("test"),
        mount: new Set("test"),
        unMount: new Set("test"),
        watch: new Set("test"),
        focus: "test",
        watchAll: false,
      },
      _subjects: {
        watch: jest.fn(),
        array: jest.fn(),
        state: jest.fn(),
      },
      _getWatch: jest.fn(),
      _formValues: ["test"],
      _defaultValues: ["test"],
    },
    getValues: () => {
      return [];
    },
    setValue: () => jest.fn(),
    formState: {
      errors: { username: true, password: true },
      isDirty: true,
      isSubmitting: false,
      isValid: true,
    },
    watch: () => jest.fn(),
  }),
  Controller: () => [],
  useSubscribe: () => ({
    r: { current: { subject: { subscribe: () => jest.fn() } } },
  }),
}));

const mockGetRequestToken = jest.fn();
jest.mock("../app/api", () => {
  return {
    getRequestToken: () => {
      return mockGetRequestToken();
    },
  };
});

const mockValidateRequestToken = jest.fn();
jest.mock("../app/api", () => {
  return {
    validateRequestToken: () => {
      return mockValidateRequestToken();
    },
  };
});

// Mock the useRouter function
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

test("renders Login page", async () => {
  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  mockGetRequestToken.mockImplementation(() => {
    return {
      request_token: "",
    };
  });

  mockValidateRequestToken.mockImplementation(() => {
    return {
      success: true,
    };
  });

  jest
    .spyOn(React, "useState")
    .mockImplementation(() => ["", () => ""])
    .mockImplementation(() => ["", () => ""])
    .mockImplementation(() => ["", () => null])
    .mockImplementation(() => [false, () => null]);
  const { findByTitle } = render(<Login />);
  const elementLogin = await findByTitle(/login/i);
  fireEvent.submit(elementLogin);
  RedirectToHome();
  expect(mockPush).toHaveBeenCalledWith("/");
});
