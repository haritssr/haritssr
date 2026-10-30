// Shared input limits; stored legacy records intentionally allow longer text.
export const TASK_INPUT_LIMITS = {
  activity: 30,
  description: 30,
  minimumDuration: 1,
  maximumDuration: 86_400,
} as const;

export function readTaskForm(
  form: FormData,
  descriptionLimit: number = TASK_INPUT_LIMITS.description
) {
  const hours = Number(form.get("hours"));
  const minutes = Number(form.get("minutes"));
  const seconds = Number(form.get("seconds"));
  const duration = hours * 3600 + minutes * 60 + seconds;
  if (
    ![hours, minutes, seconds].every(Number.isInteger) ||
    duration < TASK_INPUT_LIMITS.minimumDuration ||
    duration > TASK_INPUT_LIMITS.maximumDuration
  ) {
    return "Choose a duration from one second to 24 hours.";
  }
  const activityValue = form.get("activity");
  const activity =
    typeof activityValue === "string" ? activityValue.trim() : "";
  if (activity.length === 0) {
    return "Enter an activity name.";
  }
  if (activity.length > TASK_INPUT_LIMITS.activity) {
    return `Use ${TASK_INPUT_LIMITS.activity} characters or fewer for the activity name.`;
  }
  const descriptionValue = form.get("description");
  const description =
    typeof descriptionValue === "string" ? descriptionValue.trim() : "";
  if (description.length > descriptionLimit) {
    return `Use ${descriptionLimit} characters or fewer for the description.`;
  }
  return {
    activity,
    description,
    duration,
  };
}
