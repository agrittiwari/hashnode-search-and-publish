import { environment, getPreferenceValues } from "@raycast/api";
import FollowedAccountLists from "../components/FollowedAccountLists";

export default function Search() {
  const preferences = getPreferenceValues();
  //   console.log(preferences);
  //   console.log(`Raycast version: ${environment.raycastVersion}`);
  //   console.log(`Extension name: ${environment.extensionName}`);
  //   console.log(`Command name: ${environment.commandName}`);
  //   console.log(`Command mode: ${environment.commandMode}`);
  //   console.log(`Assets path: ${environment.assetsPath}`);
  //   console.log(`Support path: ${environment.supportPath}`);
  //   console.log(`Is development mode: ${environment.isDevelopment}`);
  //   console.log(`Appearance: ${environment.appearance}`);
  //   console.log(`Text size: ${environment.textSize}`);
  //   console.log(`LaunchType: ${environment.launchType}`);

  return <FollowedAccountLists />;
}
