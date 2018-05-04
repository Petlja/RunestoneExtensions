# Extensions to RunestoneComponents by Petlja

This reopository contains a set od [Sphinx](http://www.sphinx-doc.org) extension modules that are intented to be used as additional components with the RunestoneComponents framesork, and also contains a customized Sphinx theme aligned with the Petlja.org look & feel.

We recomand also to use Petlja's fork of RunestoneComponents (https://github.com/Petlja/RunestoneComponents-Petlja) with those extension modules. 

List of implemented Sphinx extenion modules:
- `runestone_petlja_ext.karel` - support for Karel the Robot.

The implemented theme:
- `bootstrap_petlja_theme`

## Using Extensions to RunestoneComponents in your interactive book project

- If you already have the `runestone` package installed in your environment, remove it with `pip uninstall runestone`
- Clone this repositori and the repository https://github.com/Petlja/RunestoneComponents-Petlja 
- In the folders of both repositories, run `pip install -e .` 
- To update, just do `git pull` in the appropriate repository (or both)
- In the `conf.py` of your project make those changes:
    - add into `extensions` any Sphinx extension modules you want to use
    - set `html_theme` to `bootstrap_petlja_theme` and comment out `templates_path` and `html_theme_path`

## Notes for developers

This repository and RunestoneComponents-Petlja together provide customized RunestoneComponents. You should carefuly plan what changdes to adres to each of repositories.

If you just need internatioanalization, a little bit more configurability or some small additional feature, then consider to make of an appropriate thematic branch in RunestoneComponents-Petlja and act as you are making a contribution to RunestoneComponents. You shoud merge you thematic branche into the master branche when you finish or at some milestones.

