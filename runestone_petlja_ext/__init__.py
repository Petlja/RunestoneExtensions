import os

modules = ['karel', 'notes', 'pygamelib','blockpylib']

def extensions():
    return ['runestone_petlja_ext.' + module for module in modules]

def static_dirs():
    basedir = os.path.dirname(__file__)
    subdirs = ['js','css', 'images', 'bootstrap']
    dirs0 = [basedir + '/' + m + '/' + s for m in modules for s in subdirs]
    dirs = [dir for dir in dirs0 if os.path.exists(dir)]
    return dirs

def create_style(divclass):
    return 'course-box {} course-content'.format(divclass)

def config_values_for_components(glob):
    box_problem = 'course-box-problem'
    box_question = 'course-box-question'
    problem_style =  create_style(box_problem)
    question_style = create_style(box_question)
    glob['activecode_div_class'] = problem_style
    glob['activecode_hide_load_history'] = True
    glob['mchoice_div_class'] = question_style
    glob['fitb_div_class'] = question_style
    glob['dragndrop_div_class'] = problem_style
    glob['tabbed_div_class'] = question_style
    glob['codelens_div_class'] = question_style
    glob['clickable_div_class'] = question_style
    glob['shortanswer_div_class'] = question_style
    glob['poll_div_class'] = question_style
    glob['showeval_div_class'] = problem_style
    glob['tabbed_div_class'] = problem_style
    glob['accessibility_style'] = 'none'
