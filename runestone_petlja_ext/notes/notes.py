__author__ = 'petlja'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive


def setup(app):
    app.add_stylesheet('notes.css')
    app.add_javascript('notes.js')

    app.add_directive('infonote', InfoNoteDirective)
    app.add_directive('questionnote', QuestionNoteDirective)
    app.add_directive('level', LevelDirective)

    app.add_node(InfoNoteNode, html=(visit_info_note_node, depart_info_note_node))
    app.add_node(QuestionNoteNode, html=(visit_question_note_node, depart_question_note_node))
    app.add_node(LevelNode, html=(visit_level_node, depart_level_node))


TEMPLATE_START = """
    <div class="course-box course-box-info">
        <div class="course-content">
            <p>
"""

TEMPLATE_END = """
    </p></div></div>
"""


class InfoNoteNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(InfoNoteNode, self).__init__()
        self.note = content


def visit_info_note_node(self, node):
    node.delimiter = "_start__{}_".format("info")
    self.body.append(node.delimiter)
    res = TEMPLATE_START
    self.body.append(res)


def depart_info_note_node(self, node):
    res = TEMPLATE_END
    self.body.append(res)
    self.body.remove(node.delimiter)


class InfoNoteDirective(Directive):
    """
.. infonote::
    """
    required_arguments = 0
    optional_arguments = 0
    has_content = True

    def run(self):
        """
        generate html to include note box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)

        innode = InfoNoteNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, innode)

        return [innode]

TEMPLATE_START_Q = """
    <div class="course-box course-box-special">
        <div class="course-content">
            <h4 class="carbox-title">
                <img class="corner-image float-right" src="_static/img/question-mark.png" />
            </h4>
            <p>
"""

TEMPLATE_END_Q = """
    </p></div></div>
"""


class QuestionNoteNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(QuestionNoteNode, self).__init__()
        self.note = content


def visit_question_note_node(self, node):
    node.delimiter = "_start__{}_".format("info")
    self.body.append(node.delimiter)
    res = TEMPLATE_START_Q
    self.body.append(res)


def depart_question_note_node(self, node):
    res = TEMPLATE_END_Q
    self.body.append(res)
    self.body.remove(node.delimiter)


class QuestionNoteDirective(Directive):
    """
.. questionnote::
    """
    required_arguments = 0
    optional_arguments = 0
    has_content = True

    def run(self):
        """
        generate html to include note box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)

        qnnode = QuestionNoteNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, qnnode)

        return [qnnode]

TEMPLATE_START_L_CONTAINER = """
    <div class="rst-level rst-level-%(complexity)s">
"""

TEMPLATE_START_L = """
    <div data-level="%(complexity)s" style="display:none">
"""

TEMPLATE_END_L = """
    </div>
"""

class LevelNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(LevelNode, self).__init__()
        self.note = content


def visit_level_node(self, node):
    node.delimiter = "_start__{}_".format("level")
    self.body.append(node.delimiter)

    if 'container' in node.note:
        res = TEMPLATE_START_L_CONTAINER % node.note
    else:
        res = TEMPLATE_START_L % node.note
    self.body.append(res)
 

def depart_level_node(self, node):
    res = TEMPLATE_END_L
    self.body.append(res)
    self.body.remove(node.delimiter)
 

class LevelDirective(Directive):
    """
.. level:: 2
    :container:
    """
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    option_spec = {
        'container':directives.flag,
    }

    def run(self):
        """
        generate html to include level box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)
        self.options['complexity'] = self.arguments[0]

        innode = LevelNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, innode)

        return [innode]
