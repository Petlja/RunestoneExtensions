# koristi se invoke komanda za pokretanje taskova (vidi http://pyinvoke.org/, instalira se pip-om)

import os
import shutil
from invoke import task

def copy(fsrc, fdst, base_dir = None):
    if base_dir:
        fsrca = os.path.join(base_dir, fsrc)
        fdsta = os.path.join(base_dir, fdst)
    else:
        fsrca, fdsta = fsrc, fdst
    fsrcn = os.path.abspath(fsrca)
    fdstn = os.path.abspath(fdsta)
    print(f"copy {fsrcn} ->\n     {fdstn}")
    shutil.copyfile(fsrcn, fdstn)

@task 
def update(c):
    base_dir = c.config._project_prefix
    
    pygamelib_src_dir = os.path.join(base_dir, "../pygame4skulpt/pygamelib/")
    pygamelib_dst_dir = os.path.join(base_dir, "runestone_petlja_ext/pygamelib/js/pygamelib/")
    for f in os.listdir(pygamelib_src_dir):
        copy(os.path.join(pygamelib_src_dir,f), os.path.join(pygamelib_dst_dir,f))
    
    copy("../blockpy-petlja/blockly/blockly_compressed.js", "runestone_petlja_ext/blockpylib/js/blockly/blockly_compressed.js", base_dir)
    copy("../blockpy-petlja/blockly/blocks_compressed.js", "runestone_petlja_ext/blockpylib/js/blockly/blocks_compressed.js", base_dir)
    copy("../blockpy-petlja/blockly/python_compressed.js", "runestone_petlja_ext/blockpylib/js/blockly/python_compressed.js", base_dir)
    copy("../blockpy-petlja/blockly/msg/js/sr.js", "runestone_petlja_ext/blockpylib/js/blockly/msg-sr.js", base_dir)

    for f in ["utilities.js", "python_errors.js", "ast_node_visitor.js", 
               "abstract_interpreter.js", "pytifa.js",
               "abstract_interpreter_definitions.js", "python_to_blockly.js", "imported.js"]:
        copy(os.path.join("../blockpy-petlja/src/",f), 
             os.path.join("runestone_petlja_ext/blockpylib/js/blockpy/",f), base_dir)

    for f in os.listdir(os.path.join(base_dir, "../blockpy-petlja/src/blockly_blocks/")):
        copy(os.path.join("../blockpy-petlja/src/blockly_blocks/",f), 
             os.path.join("runestone_petlja_ext/blockpylib/js/blockpy/blocks/",f), base_dir)

    for f in os.listdir(os.path.join(base_dir, "../blockpy-petlja/blockly/media/")):
        copy(os.path.join("../blockpy-petlja/blockly/media/",f), 
             os.path.join("runestone_petlja_ext/blockpylib/images/blockly/",f), base_dir)
    
    copy("../BlockPyExample/blockpy-modal.js", "runestone_petlja_ext/blockpylib/js/blockpy-modal.js", base_dir)


