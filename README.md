# Liquid Metal Website

This site is built using [Hugo](https://gohugo.io/) with the
[Hextra](https://imfing.github.io/hextra/) theme, which is pulled in as a Hugo
module (see `go.mod`). No Node.js or npm packages are needed.

It is published by Netlify (see `netlify.toml`) when there are new pushes to
`main`. Do not attempt to publish manually.

## Local development

```bash
git clone https://github.com/liquidmetal-dev/site
cd site
mise install
```

`mise install` gets the pinned Hugo and Go versions from `mise.toml`. Hugo
modules need `go` on your `PATH`.

```bash
make serve
```

This runs `hugo server --bind 0.0.0.0`, so you can open the site from another
machine at `http://<device ip>:1313`. Locally it is at http://localhost:1313/.

To build the site into `public/`:

```bash
make build
```

Broken internal links fail the build.

## Content

- Docs live under `content/docs/` and blog posts under `content/blog/`. Order
  docs with `weight` in the front matter.
- Use GitHub-style alerts (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, ...) for
  callouts.
- Link to other pages with relative `.md` paths or site paths such as
  `/docs/community/contact`.
- Redirects for old URLs are in `netlify.toml`.

## Contributing

Please, please do this :sweat_smile:.

There are so many docs to write and so few hours in the day and I am one person!

So, if you find a typo, instead of opening an issue... why not submit a quick PR?

A good guide for the sort of content found in good docs can be found [here](https://documentation.divio.com/).

If anyone wants to improve the look and functionality of the site that would be sweet.

Developing the site is pretty easy:

- Fork this repo
- Create a feature branch
- Follow the instructions at the top of this page to start your local environment
- Make your changes
- Check they look okay, take some screenshots if you changed more than just text
- Open a PR, include your screenshots
- Profit
