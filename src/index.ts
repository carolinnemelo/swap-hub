import { createApp } from "./app";

function startApp() {
  createApp().listen(3000, () => {
    console.log("App is running on port 3000");
  });
}

startApp()