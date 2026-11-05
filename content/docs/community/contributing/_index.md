---
title: "Contributing to Liquid Metal repos"
linkTitle: "Guide for Contributors"
weight: 3
---

Your one-stop-shop for getting involved in Liquid Metal!

{{< section-pages >}}

Each component will have its own dedicated contribution guide along with specific
environment setup instructions. (_If they don't, or they are wrong, why not contribute some?_ :wink:)

You can follow the links from the [previous page](/docs/community/contributing/choices)
which will take you to the repos' github pages and individual `CONTRIBUTING.md` guides.

Here are some steps and guidelines which will apply to all, so read these first before you
head off to your chosen repo :runner:.

## Working on your solution

1. Create a fork of the component repo and clone your fork. _Pay attention to what
  the specific component's docs say about_ where _you should clone the repo locally_.
  You may also want to add the original repo to your remotes to keep up to date
  with upstream changes.

1. Follow the repo's instructions to set up your environment.

1. Run the unit tests.

1. Create a new branch for your work.

      ```bash
      git checkout -b <feature-name>
      ```

1. Write your solution, making sure you stick to repo patterns and practices.

1. Try to commit in small chunks so that changes are well described
  and not lumped in with something unrelated. This will make debugging easier in
  the future. Make sure commit messages are in the [proper format][commit].

1. Ensure that every commit you intend to be merged is **compilable** and that the
  tests run successfully at that point.

1. Make sure your commits are [signed][gpg].

1. **All code contributions must be submitted with unit tests**. Each repo will
  detail or demonstrate what appropriate testing looks like.

1. For extra special bonus points, if you see any tests missing from the area you are
  working on, please add them! It will be much appreciated :heart: .

1. Check any documentation and update it to cover your changes if applicable.
  If your change will impact the next version of the product, you will also need to
  update the [site][site] to describe any new user actions or API features.

1. Before you [open your PR][submission], run all the unit and any other tests and manually
  verify that your solution works.

## PR submission guidelines

Push your changes to the branch on your fork and submit a pull request to the original repository
against the `main` branch.
Where possible, please squash your commits to ensure a tidy and descriptive history.
Make sure each commit which will be merged is compilable with the tests passing at
that point.

```bash
git push <remote-name> <feature-name>
```

If your PR is still a work in progress, please open a [Draft PR][draft]
and prefix your title with the word `WIP`. When your PR is ready for review, you
can change the title and remove the Draft setting.

Our GitHub Actions integration will run any automated checks. We will review your
changes and give you feedback as soon as possible.

We recommend that you regularly rebase from `main` of the original repo to keep your
branch up to date.

Please ensure that `Allow edits and access to secrets by maintainers` is checked.
While the maintainers will of course wait for you to edit your own work, if you are
unresponsive for over a week, they may add corrections or even complete the work for you,
especially if what you are contributing is very cool :the_horns: .

PRs which adhere to our guidelines are more likely to be accepted
(when opening the PR, please use the checklist in the template if there is one for that repo):

1. **The description is thorough.** When writing your description, please be as detailed as possible: don't make people
  guess what you did or simply link back to the issue (the issue explains the problem
  you are trying to solve, not how you solved it.)
  Guide your reviewers through your solution by highlighting
  key changes and implementation choices. Try and pre-empt any obvious questions
  they may have. Providing snippets (or screenshots) of output is very helpful to
  demonstrate new behaviour or UX changes. (Snippets are more searchable than screenshots,
  but we wont be mad at a sneak peek at your terminal envs :eyes: .)

1. **The change has been manually tested.** If you are supplying output above
  then that can be your manual test, with proof :clap:.

1. **The PR has a snappy title**. Your PR title will end up in the release notes,
  so make it a good one. Using the same rule as for the title of a [commit message][commit]
  is generally a good idea. Try to use the [imperative][imperative] and centre it around the behaviour
  or the user value it delivers, rather than any implementation detail.

    eg: `"changed SomeFunc in file.go to also do thing X"`
    is not useful for folks stopping by to quickly see what new stuff they can do with
    the component, save that for commit messages or the PR description.
    The title `"(feat): Add support for XYZ"` conveys the intent concisely and clearly.

1. **There are new tests for new code.** This is very much required.

1. **There are new tests for old code in the same area!** This will earn you the title of "Best Loved
  and Respected Contributor" :boom: :sunglasses: .

1. **There are well-written commit messages** ([see below][commit])
  which will make future debugging fun. (Any commits of the variety `"fix stuff"`, `"does thing"`
  or `"my god why"` must be squashed or rebased.)

1. **Each of those well-written commits is compilable** and the tests run successfully at
  that point.

In general, we will merge a PR once someone in the team has reviewed and approved it.
Trivial changes (e.g., corrections to spelling) may get waved through quickly.
For substantial changes, more people may become involved, and you might get asked to resubmit the PR or divide the
changes into more than one PR if there is too much going on.

### Commit message formatting

_For more on how to write great commit messages, and why you should, check out
[this excellent blog post][git-commit]._

We follow a rough convention for commit messages that is designed to answer three
questions: what changed, why was the change made, and how did you make it.

The subject line should feature the _what_ and
the body of the commit should describe the _why_ and _how_.
If you encountered any weirdness along the way, this is a good place
to note what you discovered and how you solved it.

An example of a stellar commit message can be found [here][eg-commit].

The format can be described more formally as follows:

```text
<short title for what changed, <=70 characters>
<BLANK LINE>
<why this change was made and what changed>
<BLANK LINE>
<any interesting details>
```

The first line is the subject and should be no longer than 70 characters, the
second line is always blank, and other lines should be wrapped at a max of 80 characters.
This allows the message to be easier to read on GitHub as well as in various git tools.

[Here][commit-tmpl] is a template which you can add to your local git config which will
make commit messages easy.

## Reviewing PRs

The core team aims to clear the PR queue as quickly as possible. Community members
should also feel free to keep an eye on things and provide their own thoughts and expertise.

High-value and/or high priority contributions will be processed as quickly as possible,
while lower priority or nice-to-have things may take a little longer to get approved.

To help facilitate a smoother and faster review, follow the guidelines [above][submission].
Submissions which do not meet standards will be de-prioritised for review.

[commit]: #commit-message-formatting
[submission]: #pr-submission-guidelines
[gpg]: https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits
[site]: https://github.com/liquidmetal-dev/site
[draft]: https://github.blog/2019-02-14-introducing-draft-pull-requests/
[imperative]: https://en.wikipedia.org/wiki/Imperative_mood
[eg-commit]: https://github.com/liquidmetal-dev/flintlock/commit/7a30dd99dc7c05827ba11050505c476799bb2932
[commit-tmpl]: https://gist.github.com/yitsushi/656e68c7db141743e81b7dcd23362f1a
[git-commit]: https://chris.beams.io/posts/git-commit/
