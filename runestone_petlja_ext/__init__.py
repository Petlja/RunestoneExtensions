import os

def extensions():
    return ['runestone_petlja_ext.karel', 'runestone_petlja_ext.notes']

def static_dirs():
    basedir = os.path.dirname(__file__)
    module_paths = [ x for x in os.listdir(basedir) if os.path.isdir(os.path.join(basedir,x))]
    module_static_js = ['%s/js' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/js' % os.path.join(basedir,x))]
    module_static_css = ['%s/css' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/css' % os.path.join(basedir,x))]
    module_static_image = ['%s/images' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/images' % os.path.join(basedir,x))]
    module_static_bootstrap = ['%s/bootstrap' % os.path.join(basedir,x) for x in module_paths if os.path.exists('%s/bootstrap' % os.path.join(basedir,x))]
    return module_static_js + module_static_css + module_static_image + module_static_bootstrap
