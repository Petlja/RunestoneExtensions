__author__ = 'petlja'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from runestone.common.runestonedirective import add_i18n_js, add_codemirror_css_and_js
from ast import literal_eval

def setup(app):
    app.add_directive('audio',AudioDirective)


TEMPLATE_START = """
    <div class = "runestone">
      <audio controls="controls" class="audio">
         <source src="%(path)s" type="audio/wav">
         Your browser does not support the <code>audio</code> element. 
     </audio>
     </div>
"""



class AudioDirective(Directive):
    """
.. audio:: file_name
   :ext: file_extension


   .. audio:: lecture_1
    
   .. audio:: lecture_2
    :ext: 'mp4'
    """
    required_arguments = 1
    optional_arguments = 1
    has_content = False
    option_spec = {
        "ext":directives.unchanged,
    }

    def run(self):
        """
        generate html to include audio div.
        :param self:
        :return:
        """
        env = self.state.document.settings.env

        self.options['path'] = "_static/audio/"+self.arguments[0]

        if "ext" in self.options:
            ext = literal_eval(self.options["ext"])
            if len(ext)>5:
                raise IOError("Extension length exceeded")
            self.options["ext"] = ext
        else:
            self.options["ext"] = "wav"
        
        self.options['path'] += "."+self.options["ext"]
        
        res = TEMPLATE_START % self.options
        raw_node = nodes.raw(self.block_text, res, format="html")
        raw_node.source, raw_node.line = self.state_machine.get_source_and_line(
            self.lineno
        )
        return [raw_node]



