// Playmaker v2 API documentation: https://api.playmaker.so/docs/static/index.html#/v2

const API_URL = "https://api.playmaker.so/v2";
const API_KEY = "pmak-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

async function postRequest(endpoint, body) {
  try {
    const response = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Success:", result);
      return true;
    }
    console.error("Error:", result);
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

async function track(event) {
  return await postRequest("/event/track", event);
}

async function identify(event) {
  return await postRequest("/event/identify", event);
}

// Use anonymousId if the user is not logged in or you don't have a userId.
// If you have a userId, you don't need to provide anonymousId.
// If you call identify with a userId and then call track with the same userId, the user will be identified and the track event will be associated with the user.
// If you call track with a userId that has not been identified, the track event will be associated with the user once the user is identified.
// So the order of the calls is not important. You can call identify first and then track, or you can call track first and then identify.
// You can also call identify multiple times with the same userId to update the user's traits.
//
// EXAMPLE USAGES:

async function main() {
  await track({
    name: "Team Member Invited",
    userId: "9df04ca3"
  });
  
  await track({
    name: "Demo Visited",
    anonymousId: "000001780980"
  });
  
  await track({
    name: "Survey Created",
    userId: "9df04ca3",
    anonymousId: "000001780980",
    properties: {
      surveyId: "123", 
      surveyName: "Survey 1",
    },
    timestamp: "2024-02-18T23:24:25.260Z", // (optional) ISO 8601 date string
  });
  
  await identify({
    userId: "9df04ca3",
    traits: {
      email: "test@test.com"
    }
  });

  await identify({
    userId: "9df04ca3",
    anonymousId: "000001780980", 
    traits: {
      email: "test@test.com", // (optional) this will be used to match the user with other data sources
      firstName: "Lorem", // (optional)
      lastName: "Ipsum", // (optional)
      title: "CEO", // (optional)
      userSystemRole: "user", // (optional) admin or user
    }
  });
}

(async () => {
  await main();
})();
