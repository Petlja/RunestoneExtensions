# Copyright (C) 2011  Bradley N. Miller
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
__author__ = 'nenadmilutinovic'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from runestone.server.componentdb import addQuestionToDB, addHTMLToDB
from runestone.common.runestonedirective import RunestoneIdDirective, RunestoneDirective

def setup(app):
    app.add_directive('ytpopup', YtPopUp)
    app.add_autoversioned_stylesheet('video.css')
    app.add_autoversioned_javascript('runestonevideo.js')

class YtPopUp(IframeVideo):
    """
.. youtube:: YouTubeID
   :divid: the runestone id for this video
   :height: 315
   :width: 560
   :align: left
   :http: http
   """
    html = '''
    <div  onclick="javascript:toggleYTVideo('%(video_id)s\');"  style="text-align: center; margin: 15px; cursor:pointer;">
        <div style="background-image: url('https://img.youtube.com/vi/%(video_id)s/mqdefault.jpg'); background-repeat: no-repeat;background-position: center; height: 210px; width: 310px; margin: 0 auto; border: 1px solid #20c997">
            <img src="_static/images/play_button.svg" style="margin-top: 78px;" /> 
        </div>
      

        </div>
    <div id="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(128, 182, 128, 0.3); z-index: 10000;" onclick="javascript:toggleYTVideo();">
        <div style="background-color: white; position: fixed; top: 4vh; left: 5vw; width:  90vw; height:  90vh; z-index: 100;" id="YTmodal">
        </div>
    </div>
    <script>
        function toggleYTVideo(videoId){
            var srcValue = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
            if ($('#modal').css("display") == "none") {
                document.getElementById("YTmodal").innerHTML = "<iframe id='ytplayer' style='height: 90vh; width: 90vw;' src='" + srcValue + "' allowfullscreen></iframe>";
                document.getElementById("modal").setAttribute("style", "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(140, 140, 140, 0.3); z-index: 10000;");
            } else {
                document.getElementById("YTmodal").innerHTML = "";
                document.getElementById("modal").setAttribute("style", "display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(140, 140, 140, 0.3); z-index: 10000;");
            }
        }
    </script>
    
    '''

    def run(self):
        raw_node = super(YtPopUp, self).run()
        addQuestionToDB(self)
        return raw_node