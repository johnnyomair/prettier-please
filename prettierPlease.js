const chalk = require("chalk");
const fs = require("fs");
const spawn = require("cross-spawn");

const executeCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });

    child.on("close", code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
};

const initGitRepository = () => executeCommand("git", ["init"]);

const installDependencies = () => {
  const dependencies = ["prettier", "husky", "lint-staged"];
  const command = "npm";
  const args = ["install", "--save-dev", "--loglevel", "error"].concat(
    dependencies
  );

  return executeCommand(command, args);
};

const prettierPlease = async () => {
  const packageJsonFile = "package.json";

  if (!fs.existsSync(packageJsonFile)) {
    console.error(
      chalk.red(
        `Can't find package.json. Please execute inside the root of the project.`
      )
    );
    process.exit(1);
  }

  let packageJson = JSON.parse(fs.readFileSync(packageJsonFile));
  const projectName = packageJson.name;

  console.log(`Setting up Prettier for project ${chalk.green(projectName)}.`);
  console.log();

  if (!fs.existsSync(".git/")) {
    await initGitRepository();
    console.log();
  }

  try {
    console.log("Installing packages. This might take a couple of minutes.");
    console.log(
      `Installing ${chalk.cyan("prettier")}, ${chalk.cyan(
        "husky"
      )} and ${chalk.cyan("lint-staged")}...`
    );
    console.log();

    await installDependencies();
  } catch (error) {
    console.error(chalk.red("Failed to install dependencies."));
    process.exit(1);
  }

  // Read package.json again to not override devDependencies.
  packageJson = JSON.parse(fs.readFileSync(packageJsonFile));

  packageJson["husky"] = {
    hooks: {
      "pre-commit": "lint-staged"
    }
  };

  packageJson["lint-staged"] = {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write", "git add"]
  };

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

  console.log(`Success! Added Prettier to project ${packageJson.name}.`);
  console.log();
  console.log("I suggest that you format your existing code by typing:");
  console.log();
  console.log(
    `  ${chalk.cyan(
      `npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"`
    )}`
  );
  console.log();
  console.log("Enjoy your prettier (pun intended) code! 🎉");
  console.log();
};

prettierPlease();
