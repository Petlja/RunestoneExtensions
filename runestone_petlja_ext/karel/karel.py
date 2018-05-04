#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = 'petlja'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import json
import os


def setup(app):
    app.add_directive('karel', KarelDirective)

    app.add_stylesheet('codemirror.css')
    app.add_stylesheet('karel.css')

    app.add_javascript('codemirror.js')

    app.add_javascript('karelCorner.js')
    app.add_javascript('karelRobot.js')
    app.add_javascript('karelWorld.js')
    app.add_javascript('karelRobotDrawer.js')

    app.add_javascript('karelUI.js')
    app.add_javascript('skulpt.min.js')
    app.add_javascript('skulpt-stdlib.js')
    app.add_javascript('karel.js')

    app.add_node(KarelNode, html=(visit_karel_node, depart_karel_node))

    app.connect('doctree-resolved', process_karel_nodes)
    app.connect('env-purge-doc', purge_karel_nodes)


TEMPLATE_START = """
<div data-childcomponent="%(divid)s" class="karel_section course-box course-box-problem">
    <div class="course-content">
        <p>
"""

TEMPLATE_END = """
    <div data-component="karel" id="%(divid)s" class="karel_section">
        <div class="karel_actions col-md-12"><button class="btn btn-success run-button">Покрени програм</button>
        <button class="btn btn-default reset-button">Врати на почетак</button></div>
        <div style="overflow: hidden;" class="karel_actions col-md-12" >
            <section class="col-md-12">
                <article>
                    <textarea class="codeArea" id="%(divid)s" name="code" rows="10" style="width: 100%%;height:300px"></textarea>
                    <textarea class="configArea" style="display:none"><!--x %(initialcode)s x--></textarea>
                </article>
            </section>
            <section class="col-md-12">
                <article>
                    <canvas class="world" style="border-style: solid; border-width: 2px; border-color: inherit; background: white;" width="300" height="300">
                        <p>Please try loading this page in HTML5 enabled web browsers. All the latest versions of famous browsers such as Internet explorer, Chrome, Firefox, Opera support HTML5.</p>
                    </canvas>
                </article>
            </section>
        </div>
    </div>
    <p class="karel_caption karel_caption_text"> (%(divid)s)</p>
</p></div></div>

"""

class KarelNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(KarelNode, self).__init__()
        self.karel_components = content


def visit_karel_node(self, node):
    node.delimiter = "_start__{}_".format(node.karel_components['divid'])

    self.body.append(node.delimiter)

    res = TEMPLATE_START % node.karel_components
    self.body.append(res)


def depart_karel_node(self, node):
    res = TEMPLATE_END % node.karel_components
    self.body.append(res)
    self.body.remove(node.delimiter)

def process_karel_nodes(app, env, docname):
    pass


def purge_karel_nodes(app, env, docname):
    pass


class KarelDirective(Directive):
    """
.. karel::
    """
    required_arguments = 1
    optional_arguments = 0
    has_content = True

    def run(self):
        """
        generate html to include Karel box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        # keep track of how many activecodes we have....
        # could be used to automatically make a unique id for them.
        if not hasattr(env, 'karelcounter'):
            env.activecodecounter = 0
        env.activecodecounter += 1
        self.options['name'] = self.arguments[0].strip()
        self.options['divid'] = self.arguments[0]

        if not self.options['divid']:
            raise Exception("No divid for ..karel karel.py")

        explain_text = None
        if self.content:
            if '~~~~' in self.content:
                idx = self.content.index('~~~~')
                explain_text = self.content[:idx]
                self.content = self.content[idx+1:]
            source = "\n".join(self.content)
        else:
            source = '\n'

        self.options['initialcode'] = source.replace("<", "&lt;")
        str = source.replace("\n", "*nline*")
        str0 = str.replace("\"", "*doubleq*")
        str1 = str0.replace("(", "*open*")
        str2 = str1.replace(")", "*close*")
        str3 = str2.replace("'", "*singleq*")
        self.options['argu'] = str3

        knode = KarelNode(self.options)
        self.add_name(knode)    # make this divid available as a target for :ref:

        return [knode]

