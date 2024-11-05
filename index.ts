import fs from 'fs';
import { z } from 'zod';
import { version } from './package.json';

import child_process from 'child_process';

const CONFIG_FILE = 'action.toml';

const commandSchema = z.object({
  cmd: z.string().min(1),
});

const cliCommands = ['list', 'version', 'help'];

let cmd;

try {
  const commands = await import(`${process.cwd()}/${CONFIG_FILE}`);
  const commandToRun = process.argv[2];

  if (commandToRun && cliCommands.includes(commandToRun)) {
    switch (commandToRun) {
      case 'list':
        console.log('Available commands:');
        Object.keys(commands.default).forEach((command) => {
          console.log(`  ${command}`);
        });
        break;
      case 'version':
        console.log(`v${version}`);
        break;
      case 'help':
        console.log('Usage: action <command>');
        console.log('Available commands:');
        cliCommands.forEach((command) => {
          console.log(`  ${command}`);
        });
    }

    process.exit(0);
  }

  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(`failed to find config file: ${CONFIG_FILE}`);
    process.exit(1);
  }

  if (!commandToRun) {
    // Access the first command from the default export
    // @ts-ignore
    cmd = Object.values(commands.default)[0].cmd;
  } else {
    // Access the specified command from the default export
    cmd = commands.default[commandToRun]?.cmd;
  }

  if (!cmd) {
    throw new Error('Command not found');
  }

  commandSchema.parse({ cmd });

  // Execute the command
  child_process.execSync(cmd, { stdio: 'inherit' });

  console.log('Program executed successfully');
} catch (error: any) {
  console.error(`failed to execute program: ${error.message}`);
  process.exit(1);
}
