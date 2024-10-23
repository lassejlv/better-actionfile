# Actionfile

An fast and idiot proof task runner. Use a basic TOML file to define your tasks and run them with ease.

## Installation

Check the latest release for your platform and download the binary. You can also build from source. By downloading [Bun Runtime](https://bun.sh)

```bash
git clone https://github.com/lassejlv/better-actionfile && cd actionfile && bun run build --compile --minify index.ts --outfile build/actionfile
```

## Usage

**action.toml**
```toml
[hello]
cmd = "echo Hello World"
```

```bash
action # Will run the first command in action.toml otherwiese use action <command>
```

A better guide is coming soon.
