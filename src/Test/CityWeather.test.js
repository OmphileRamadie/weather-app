import React from "react";
import CityWeather from "../Components/CityWeather";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<CityWeather />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly with props", () => {
  const tree = renderer.create(<CityWeather cityName="London" />).toJSON();
  expect(tree).toMatchSnapshot();
});
