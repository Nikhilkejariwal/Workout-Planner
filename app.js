const plannerForm = document.getElementById("planner-form");
const goalInput = document.getElementById("goal");
const experienceInput = document.getElementById("experience");
const equipmentInput = document.getElementById("equipment");
const daysInput = document.getElementById("days");
const daysOutput = document.getElementById("days-output");
const planTitle = document.getElementById("plan-title");
const summaryTime = document.getElementById("summary-time");
const overview = document.getElementById("overview");
const schedule = document.getElementById("schedule");

const goalProfiles = {
  strength: {
    title: "Strength",
    summary: "Focus on compound lifts, longer rests, and steady progression.",
    split: ["Upper body", "Lower body", "Push", "Pull", "Full body", "Power + core"],
  },
  "fat-loss": {
    title: "Fat loss",
    summary: "Blend resistance work with brisk conditioning to keep sessions efficient.",
    split: ["Full body", "Conditioning", "Upper + core", "Lower + intervals", "Circuit day", "Recovery cardio"],
  },
  muscle: {
    title: "Muscle gain",
    summary: "Use moderate volume, controlled tempo, and targeted accessory work.",
    split: ["Chest + triceps", "Back + biceps", "Legs", "Shoulders + core", "Upper pump", "Lower pump"],
  },
  endurance: {
    title: "Endurance",
    summary: "Build work capacity with repeatable efforts and shorter recovery windows.",
    split: ["Aerobic base", "Intervals", "Leg stamina", "Upper endurance", "Tempo conditioning", "Mobility + steady state"],
  },
  general: {
    title: "General fitness",
    summary: "Keep the week balanced with strength, mobility, and sustainable cardio.",
    split: ["Full body", "Cardio + core", "Strength mix", "Mobility + conditioning", "Athletic circuit", "Recovery session"],
  },
};

const experienceProfiles = {
  beginner: {
    sets: "2-3 sets",
    reps: "8-12 reps",
    time: 35,
    note: "Start with simple patterns, clean form, and moderate effort.",
  },
  intermediate: {
    sets: "3-4 sets",
    reps: "8-14 reps",
    time: 48,
    note: "Use a little more variety and add intensity across the week.",
  },
  advanced: {
    sets: "4-5 sets",
    reps: "6-15 reps",
    time: 60,
    note: "Push training density and load while managing recovery.",
  },
};

const equipmentLibrary = {
  bodyweight: {
    strength: [
      ["Tempo push-up", "Slow lowering builds pressing strength without equipment."],
      ["Split squat", "Train each leg separately to improve balance and power."],
      ["Glute bridge", "Drive through the heels to strengthen glutes and hips."],
      ["Plank shoulder tap", "Add core control while resisting side-to-side sway."],
      ["Mountain climber", "Keep the pace honest for a simple conditioning finisher."],
    ],
    "fat-loss": [
      ["Bodyweight squat", "Move continuously with a controlled rhythm."],
      ["Incline push-up", "Use a bench or counter to keep reps crisp."],
      ["Reverse lunge", "Alternate legs to raise heart rate without losing form."],
      ["High knees", "Short bursts keep the session energetic."],
      ["Dead bug", "Reset your trunk and breathing between circuits."],
    ],
    muscle: [
      ["Feet-elevated push-up", "Shift more load into the chest and shoulders."],
      ["Bulgarian split squat", "A strong leg builder with limited equipment."],
      ["Pike push-up", "Targets shoulders with an overhead pressing angle."],
      ["Single-leg hip bridge", "Increase glute demand on each side."],
      ["Hollow hold", "Create trunk stiffness that carries into other work."],
    ],
    endurance: [
      ["Step-up", "Use a sturdy platform for repeatable aerobic work."],
      ["Squat to calf raise", "Keep moving to build lower-body stamina."],
      ["Bear crawl", "Low to the floor and steady for full-body effort."],
      ["Walkout", "Challenge shoulders, core, and control in one rep."],
      ["Jumping jack", "Simple, scalable cardio volume."],
    ],
    general: [
      ["Air squat", "Build leg strength and confidence with steady reps."],
      ["Push-up", "A classic upper-body move with easy regressions."],
      ["Hip hinge reach", "Teach posterior-chain control and mobility."],
      ["Side plank", "Train lateral core stability."],
      ["Fast march", "Raise the heart rate without needing extra space."],
    ],
  },
  dumbbells: {
    strength: [
      ["Goblet squat", "Keep the torso tall while loading the legs."],
      ["Dumbbell floor press", "Press safely with a steady pause on the floor."],
      ["Romanian deadlift", "Hinge from the hips to train hamstrings and glutes."],
      ["One-arm row", "Pull the elbow back and squeeze at the top."],
      ["Farmer carry", "Finish with loaded walking for grip and core work."],
    ],
    "fat-loss": [
      ["Dumbbell thruster", "Combine squat and press for a high-output move."],
      ["Renegade row", "Alternate rows to challenge core and upper body."],
      ["Reverse lunge", "Load lightly and keep transitions smooth."],
      ["Dumbbell swing", "Use hip drive to create a conditioning effect."],
      ["Russian twist", "Rotate with control, not speed."],
    ],
    muscle: [
      ["Incline dumbbell press", "Emphasize upper chest with a deep stretch."],
      ["Dumbbell row", "Use full range for back and lat development."],
      ["Dumbbell split squat", "Adds quad and glute volume without heavy barbells."],
      ["Lateral raise", "Pause at shoulder height for better tension."],
      ["Hammer curl", "Build arms while keeping wrists neutral."],
    ],
    endurance: [
      ["Light dumbbell clean", "Repeatable power work for full-body stamina."],
      ["Alternating press", "Build shoulder endurance one side at a time."],
      ["Walking lunge", "Keep moving to maintain an aerobic feel."],
      ["Bent-over reverse fly", "Train posture during longer sets."],
      ["Suitcase carry", "Steady walking builds work capacity and core control."],
    ],
    general: [
      ["Goblet squat", "Simple lower-body loading with a clear setup."],
      ["Dumbbell press", "Train pushing strength with flexible loading."],
      ["Supported row", "A stable pulling move that is easy to learn."],
      ["Dumbbell deadlift", "Reinforce hinge mechanics and leg drive."],
      ["Overhead carry", "Blend posture, shoulder stability, and core work."],
    ],
  },
  "full-gym": {
    strength: [
      ["Back squat", "A primary lower-body strength lift for the week."],
      ["Bench press", "Drive bar speed and maintain a strong upper back."],
      ["Deadlift", "Keep the pull crisp and stop before form fades."],
      ["Pull-down or pull-up", "Balance pressing volume with vertical pulling."],
      ["Cable chop", "Add trunk strength with controlled rotation."],
    ],
    "fat-loss": [
      ["Trap-bar deadlift", "Big-muscle work that drives effort fast."],
      ["Cable row", "Strong pulling volume with minimal setup."],
      ["Leg press", "Build density in the lower body."],
      ["Bike sprints", "Short bursts raise intensity without long sessions."],
      ["Hanging knee raise", "Train core control between harder blocks."],
    ],
    muscle: [
      ["Barbell bench press", "A solid pressing anchor for hypertrophy work."],
      ["Chest-supported row", "Lets you push back volume without extra fatigue."],
      ["Hack squat", "High leg stimulus with a controlled path."],
      ["Cable lateral raise", "Keeps tension on the delts throughout the rep."],
      ["Rope pressdown", "Finish triceps after compound pressing."],
    ],
    endurance: [
      ["Row erg intervals", "Use repeatable efforts to build capacity."],
      ["Front squat", "Lighter loads challenge posture and stamina."],
      ["Seated cable row", "Accumulate pulling reps with good form."],
      ["Sled push", "Sustained effort without high technical demand."],
      ["Assault bike", "Finish with measured conditioning work."],
    ],
    general: [
      ["Leg press", "Easy to load and accessible for most trainees."],
      ["Machine chest press", "Stable pressing volume with low setup time."],
      ["Lat pull-down", "A dependable upper-back staple."],
      ["Cable pull-through", "Groove hip extension without spinal fatigue."],
      ["Treadmill incline walk", "Low-impact conditioning to round out the day."],
    ],
  },
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function createPlan({ goal, experience, equipment, daysPerWeek }) {
  const goalProfile = goalProfiles[goal];
  const experienceProfile = experienceProfiles[experience];
  const exercisePool = equipmentLibrary[equipment][goal];
  const focusDays = goalProfile.split.slice(0, daysPerWeek);
  const trainingDays = focusDays.map((focus, index) => {
    const exercises = Array.from({ length: 4 }, (_, exerciseIndex) => {
      const source = exercisePool[(index + exerciseIndex) % exercisePool.length];
      return {
        name: source[0],
        description: source[1],
        prescription: `${experienceProfile.sets} x ${experienceProfile.reps}`,
      };
    });

    const estimatedTime = experienceProfile.time + (goal === "fat-loss" ? -3 : 0) + (goal === "endurance" ? 5 : 0);

    return {
      day: weekdays[index],
      focus,
      estimatedTime,
      exercises,
    };
  });

  const recoveryDays = weekdays.slice(daysPerWeek).map((day) => ({
    day,
    focus: "Recovery and mobility",
    estimatedTime: 20,
    exercises: [
      {
        name: "Easy walk or bike",
        description: "Keep effort light and use the session to recover, not to push.",
        prescription: "15-20 min",
      },
      {
        name: "Mobility flow",
        description: "Open the hips, shoulders, and upper back with controlled movement.",
        prescription: "5-8 min",
      },
    ],
  }));

  return [...trainingDays, ...recoveryDays];
}

function renderPlan(formValues) {
  const { goal, experience, equipment, daysPerWeek } = formValues;
  const plan = createPlan(formValues);
  const goalProfile = goalProfiles[goal];
  const experienceProfile = experienceProfiles[experience];

  planTitle.textContent = `${daysPerWeek}-day ${goalProfile.title.toLowerCase()} plan`;
  summaryTime.textContent = `Training days: about ${plan[0].estimatedTime} min/session`;

  overview.innerHTML = `
    <article class="overview-card">
      <h3>Goal</h3>
      <p>${goalProfile.summary}</p>
    </article>
    <article class="overview-card">
      <h3>Training feel</h3>
      <p>${experienceProfile.note}</p>
    </article>
    <article class="overview-card">
      <h3>Equipment</h3>
      <p>${equipmentLabel(equipment)} with ${daysPerWeek} sessions each week.</p>
    </article>
  `;

  schedule.innerHTML = plan
    .map(
      (session) => `
        <article class="day-card">
          <div class="day-top">
            <div>
              <h3>${session.day}</h3>
              <p>${session.focus}</p>
            </div>
            <span class="session-length">${session.estimatedTime} min</span>
          </div>
          <div class="exercise-list">
            ${session.exercises
              .map(
                (exercise) => `
                  <div class="exercise-item">
                    <div>
                      <strong>${exercise.name}</strong>
                      <p>${exercise.description}</p>
                    </div>
                    <span class="set-count">${exercise.prescription}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function equipmentLabel(value) {
  return {
    bodyweight: "bodyweight only",
    dumbbells: "dumbbells",
    "full-gym": "full gym equipment",
  }[value];
}

daysInput.addEventListener("input", () => {
  daysOutput.textContent = `${daysInput.value} days`;
});

plannerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPlan({
    goal: goalInput.value,
    experience: experienceInput.value,
    equipment: equipmentInput.value,
    daysPerWeek: Number(daysInput.value),
  });
});

renderPlan({
  goal: goalInput.value,
  experience: experienceInput.value,
  equipment: equipmentInput.value,
  daysPerWeek: Number(daysInput.value),
});
