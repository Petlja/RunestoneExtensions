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
