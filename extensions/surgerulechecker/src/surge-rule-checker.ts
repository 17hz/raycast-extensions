import { showToast, getPreferenceValues } from "@raycast/api";
import { execSync } from "node:child_process";

interface Preferences {
  xKey: string;
}

export default async function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const script = `tell application "Google Chrome" to get URL of active tab of front window`;
  const url = execSync(`osascript -e '${script}'`).toString().trim();
  const res: any = await fetch(`http://127.0.0.1:6171/v1/requests/recent`, {
    headers: { "X-Key": preferences.xKey },
  }).then((res) => res.json());
  const requests = res.requests;
  const currentHostLog = requests.find((r: any) => r.remoteHost.includes(new URL(url).host));
  if (currentHostLog) {
    await showToast({ title: currentHostLog.rule, message: new URL(url).host });
  } else {
    await showToast({
      title: "No Surge Rule Found",
      message: "No Surge rule found for the current tab.",
    });
  }
}
