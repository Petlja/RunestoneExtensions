import os

modules = ['karel', 'notes', 'pygamelib']

def extensions():
    return ['runestone_petlja_ext.' + module for module in modules]

def static_dirs():
    basedir = os.path.dirname(__file__)
    subdirs = ['js','css', 'images', 'bootstrap']
    dirs0 = [basedir + '/' + m + '/' + s for m in modules for s in subdirs]
    dirs = [dir for dir in dirs0 if os.path.exists(dir)]
    return dirs

def config_values_for_components(glob):
    glob['activecode_div_class'] = 'course-box course-box-problem course-content'
    glob['activecode_hide_load_history'] = True
    glob['mchoice_div_class'] = 'course-box course-box-question course-content'

