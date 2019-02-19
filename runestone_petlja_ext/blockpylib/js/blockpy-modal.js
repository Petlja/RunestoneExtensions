"use strict";

/**
 * @class
 */
function BlocklPyModal() {}

/**
 * @callback BlocklPyModal~onClose
 * @param {string=} Edited Python source when closed regulary or undefined when canceld
 */
/**
 * Opens a Blockly editor with the modal experience
 * 
 * @param {string} title The title
 * @param {int} width Blockly workspace width in pixels
 * @param {int} height Blockly workspace width in pixels
 * @param {string} pythonSrc Python source to be edited in Blockly
 * @param {string} blocklyMediaDir Blockly media dir (ends with slash)
 * @param {BlocklPyModal~onClose} onClose The callback will be invoked after the editor is closed
 */
BlocklPyModal.prototype.open = function(title, width, height, pythonSrc, blocklyMediaDir, onClose) {
    var divModal = document.createElement("div");
    document.body.appendChild(divModal);
    $(divModal).addClass("modal");
    //$(divModal).css("text-align", "center");
    $(divModal).css("padding-left", "15px");

    var hideAndClearDom = function() {
        $('.modal').modal('hide');
        divModal.remove();
    }

    var btnClose = document.createElement("span");
    $(btnClose).addClass("btn btn-primary btn-sm float-right");
    var ic = document.createElement("i");
    $(ic).addClass("fas fa-times");
    btnClose.appendChild(ic);

    $(btnClose).on('click', function(e) {
        hideAndClearDom();
        onClose();
    });

    var btnSave = document.createElement("span");
    $(btnSave).addClass("btn btn-primary");
    $(btnSave).text("Vrati u Python  ");
    var icBtnSave = document.createElement("i");
    $(icBtnSave).addClass("fas fa-undo");
    btnSave.appendChild(icBtnSave);

    $(btnSave).on('click', function(e) {
        var code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        hideAndClearDom();
        onClose(code);
    });

    var divDialog = document.createElement("div");
    $(divDialog).addClass("modal-dialog modal-lg");
    $(divDialog).css("display", "inline-block");
    $(divDialog).width(self.width + 42);
    $(divDialog).attr("role", "document");
    divModal.appendChild(divDialog);

    var divContent = document.createElement("div");
    $(divContent).addClass("modal-content");
    divDialog.appendChild(divContent);

    var divHeader = document.createElement("div");
    $(divHeader).addClass("modal-header");
    var divBody = document.createElement("div");
    $(divBody).addClass("modal-body");
    var divFooter = document.createElement("div");
    $(divFooter).addClass("modal-footer d-flex justify-content-end");
    var header = document.createElement("span");
    $(header).addClass("modal-title");
    $(header).html(title);

    var divBlockly = document.createElement("div");
    $(divBlockly).attr("id", "divBlockly_BlocklPyModal");
    $(divBlockly).attr("style","width: " + width + "px; height: " + height + "px; text-align: left");

    divBody.appendChild(divBlockly);

    divContent.appendChild(divHeader);
    divContent.appendChild(divBody);
    divContent.appendChild(divFooter);

    divHeader.appendChild(header);
    divHeader.appendChild(btnClose);
    divFooter.appendChild(btnSave);

    $(divModal).modal({
        backdrop: 'static',
        keyboard: false
    });

    var blocklyWorkspace = Blockly.inject('divBlockly_BlocklPyModal',
    {
      media: blocklyMediaDir,
      toolbox: BlocklPyModal.toolboxXml
    });

    this.pythonToBlocks(pythonSrc, blocklyWorkspace)
};

BlocklPyModal.prototype.pythonToBlocks = function(code, workspace) {
    var converter = new PythonToBlocks();
    var result = converter.convertSource(code);
    var xml_code = result.xml;
    if (code == '' || code == undefined || code.trim() == '') {
        workspace.clear();
    } else if (xml_code !== '' && xml_code !== undefined) {
        var blocklyXml = Blockly.Xml.textToDom(xml_code);
        try {
            Blockly.Xml.domToWorkspaceDestructive(blocklyXml, workspace);
        } catch (e) {
            console.error(e);
            var errorXml = Blockly.Xml.textToDom(converter.convertSourceToCodeBlock(code));
            Blockly.Xml.domToWorkspaceDestructive(errorXml, workspace);
        }
    } else {
            var errorXml = Blockly.Xml.textToDom(converter.convertSourceToCodeBlock(code));
            Blockly.Xml.domToWorkspaceDestructive(errorXml, workspace);
    }
    Blockly.Events.disable();
    // Parsons shuffling
    if (true) {
        workspace.shuffle();
    } else {
        workspace.align();
    }
    Blockly.Events.enable();
};

BlocklPyModal.toolboxXml = `
<xml style="display: none">
<category name="Karel" colour="275">
    <block type="procedures_callnoreturn" inline="true">
        <mutation name="napred"/>
    </block>
    <block type="procedures_callnoreturn" inline="true">
        <mutation name="levo"/>
    </block>
    <block type="procedures_callnoreturn" inline="true">
        <mutation name="desno"/>
    </block>
    <block type="procedures_callnoreturn" inline="true">
        <mutation name="uzmi"/>
    </block>
    <block type="procedures_callnoreturn" inline="true">
        <mutation name="ostavi"/>
    </block>
    <block type="procedures_callreturn" inline="true">
        <mutation name="moze_napred"/>
    </block>
    <block type="procedures_callreturn" inline="true">
        <mutation name="broj_loptica_na_polju"/>
    </block>
    <block type="procedures_callreturn" inline="true">
        <mutation name="ima_loptica_na_polju"/>
    </block>
    <block type="procedures_callreturn" inline="true">
        <mutation name="broj_loptica_kod_sebe"/>
    </block>
    <block type="procedures_callreturn" inline="true">
    <mutation name="ima_loptica_kod_sebe"/>
</block>
</category>
<category name="Promenljive" custom="VARIABLE" colour="240"></category>
<category name="Grananja" colour="330">
  <block type="controls_if_better"></block>
  <block type="controls_if_better">
    <mutation else="1"></mutation>
  </block>
  <block type="logic_compare"></block>
  <block type="logic_operation"></block>
  <block type="logic_negate"></block>
</category>
<category name="Petlje" colour="300">
  <block type="controls_forEach"></block>
</category>
<sep></sep>
<category name="Računanja" colour="270">
  <block type="math_arithmetic"></block>
  <block type="math_round"></block>
</category>
<category name="Izlaz" colour="160">
  <block type="text_print"></block>
</category>
<category name="Ulaz" colour="165">
  <block type="text_input_noprompt"></block>
  <block type="text_input"></block>
</category>
<sep></sep>
<category name="Vrednosti" colour="100">
  <block type="text"></block>
  <block type="math_number"></block>
  <block type="logic_boolean"></block>
</category>
<category name="Konverzije" colour="275">
  <block type="procedures_callreturn" inline="true">
    <mutation name="int">
      <arg name=""></arg>
    </mutation>
  </block>
  <block type="procedures_callreturn" inline="true">
    <mutation name="float">
      <arg name=""></arg>
    </mutation>
  </block>
  <block type="procedures_callreturn" inline="true">
    <mutation name="str">
      <arg name=""></arg>
    </mutation>
  </block>
  <block type="procedures_callreturn" inline="true">
    <mutation name="bool">
      <arg name=""></arg>
    </mutation>
  </block>
</category>
<category name="Liste" colour="30">
  <block type="lists_create_with">
    <value name="ADD0">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="ADD1">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="ADD2">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  <block type="lists_create_with"></block>
  <block type="lists_create_empty"></block>
  <block type="lists_append"></block>
  <block type="range_list1"></block>
</category>    
</xml>`;
