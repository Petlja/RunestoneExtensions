# Extensions to RunestoneComponents by Petlja

This reopository contains a set od [Sphinx](http://www.sphinx-doc.org) extension modules that are intented to be used as additional components with the RunestoneComponents framesork, and also contains a customized Sphinx theme aligned with the Petlja.org look & feel.

We recomand also to use Petlja's fork of RunestoneComponents (https://github.com/Petlja/RunestoneComponents-Petlja) with those extension modules. 

List of implemented Sphinx extenion modules:
- `runestone_petlja_ext.karel` - support for Karel the Robot.

The implemented theme:
- `bootstrap_petlja_theme`

## Using Extensions to RunestoneComponents in your interactive book project

- You need to have python installed (at least version 3.6) and included in the PATH environment variable
- If you already have the `runestone` package installed in your environment, remove it with  
`pip uninstall runestone`
- Clone this repositori and the repository https://github.com/Petlja/RunestoneComponents-Petlja 
- In both folders where you have cloned those two repositories, run  
`pip install -e .` 
- When you need to update installed packages, just do `git pull` in both folders
- If you want to start a new interactive book project, make the project folder and run `runestone init` in that folder
- In the `conf.py` of your interactive book project make those changes (if someone other has not already done so):
    - after other imports add  
      `import runestone_petlja_ext`
    - at the end of the line  
      `extensions = ['sphinx.ext.mathjax'] + runestone_extensions()`  
      add  
      `+ runestone_petlja_ext.extensions()`  
    - at the end of the line  
      `html_static_path = ['_static'] + runestone_static_dirs()`  
      add  
      `+ runestone_petlja_ext.static_dirs()`  
    - modify the assigment of `html_theme` to be  
      `html_theme = 'bootstrap_petlja_theme'` 
    - at the end of `conf.py` add line 
    `runestone_petlja_ext.config_values_for_components(globals())`
- consider to set `'python3': 'true'` in `pavement.py`
- use `runestone build` and `runestone serve` to build and preview your interactive book
- more instructions you can find at: `http://runestoneinteractive.org/instructors.html`, but also take a look at other Petlja's interactive books


## Notes for developers

This repository and RunestoneComponents-Petlja together provide customized RunestoneComponents. You should carefuly plan what changdes to adres to each of repositories.

If you just need internatioanalization, a little bit more configurability or some small additional feature, then consider to make of an appropriate thematic branch in RunestoneComponents-Petlja and act as you are making a contribution to RunestoneComponents. You shoud merge you thematic branche into the master branche when you finish or at some milestones.

