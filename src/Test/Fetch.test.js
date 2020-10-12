const API_Key = "ccba6742628f727bcf5543e1cd49b109";
test("The City name should be London", async () => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${API_Key}`;
  const apiCall = await fetch(url);
  const result = await apiCall.json();

  expect(result.name).toBe("London");
});

test("Error message should be City Not Found", async () => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=Lui&APPID=${API_Key}`;
  const apiCall = await fetch(url);
  const result = await apiCall.json();

  expect(result.message).toBe("city not found");
});
