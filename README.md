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
    - add  
    `import runestone_petlja_ext`  
    after other imports
    - add  
    `+ runestone_petlja_ext.extensions()`  
    at the end of the line containing  
    `extensions = ['sphinx.ext.mathjax'] + runestone_extensions()`
    - add  
    `+ runestone_petlja_ext.static_dirs()`  
    at the ennd of the line containing  
    `html_static_path = ['_static'] + runestone_static_dirs()`
    - set `html_theme` to `bootstrap_petlja_theme` and comment out lines that set `templates_path` and `html_theme_path`
    - at the end of `conf.py` add lines:  
    `activecode_div_class = 'course-box course-box-problem course-content'`  
    `activecode_hide_load_history = True`

## Notes for developers

This repository and RunestoneComponents-Petlja together provide customized RunestoneComponents. You should carefuly plan what changdes to adres to each of repositories.

If you just need internatioanalization, a little bit more configurability or some small additional feature, then consider to make of an appropriate thematic branch in RunestoneComponents-Petlja and act as you are making a contribution to RunestoneComponents. You shoud merge you thematic branche into the master branche when you finish or at some milestones.

