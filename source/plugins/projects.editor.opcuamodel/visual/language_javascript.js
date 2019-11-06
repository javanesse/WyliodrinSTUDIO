// DO NOT EDIT THIS FILE, IT IS AUTMATICALLY GENERATED

module.exports = function (blockly) {
	var Blockly = blockly.Blockly;
	// var goog = blockly.goog;
	// Screen and Keyboard

	Blockly.JavaScript.opcuamodel_add_variable = function () {
		if (!Blockly.JavaScript.definitions_['opcuamodel_add_variable']) {
			Blockly.JavaScript.definitions_['opcuamodel_add_variable'] = 'function opcuamodelAddVariable (id, browseName, folder, namespace, dataType, options) {\n  return namespace.addVariable({\n    componentOf: folder,\n    browseName: browseName,\n    nodeId: id,\n    dataType: dataType,\n  });\n}\n';
		}
	};

	Blockly.JavaScript.opcuamodel_add_folder = function (name, statements) {
		let foldervariable = Blockly.JavaScript.variableDB_.getDistinctName(name, Blockly.Generator.NAME_TYPE);
		let folder_id = name.replace (/[^A-Za-z0-9]/g, '_');
		Blockly.JavaScript.definitions_['opcuamodel_add_folder_'+foldervariable] = 'function opcuamodelAddFolder'+foldervariable+'(parentId, parentFolder, folderName) {\n  let folder = namespace.addFolder(parentFolder,{ browseName: folderName});\n  let folderId = parentId+\'/'+folder_id+'\';\n'+statements+'}\n';
		return foldervariable;
	};

	Blockly.JavaScript.opcuamodel_add_template = function (name, statements) {
		let foldervariable = Blockly.JavaScript.variableDB_.getDistinctName(name, Blockly.Generator.NAME_TYPE);
		// let folder_id = name.replace (/[^A-Za-z0-9]/g, '_');
		Blockly.JavaScript.definitions_['opcuamodel_add_template_'+foldervariable] = 'function opcuamodelAddTemplate'+foldervariable+'(parentId, parentFolder)\n{\n  if (templateObjects[\''+name+'\'])\n  {\n    for (let objectName of templateObjects[\''+name+'\'])\n    {\n      let folderName = objectName;\n      let objectId = objectName.replace (/[^A-Za-z0-9]/g, \'_\');\n      let folder = namespace.addFolder(parentFolder,{ browseName: folderName});\n      let folderId = parentId+\'/\'+objectId;\n'+statements+'    }\n  }\n  else\n  {\n    console.error (\'No folder names found for template '+name+'\');\n  }\n}\n';
		return foldervariable;
	};

	Blockly.JavaScript['opcuamodel_variable'] = function (block) {
		Blockly.JavaScript.opcuamodel_add_variable ();
		var text_variable_name = block.getFieldValue('variable_name');
		var text_variable_id = text_variable_name.replace (/[^A-Za-z0-9]/g, '_');
		var dropdown_variable_type = block.getFieldValue('variable_type');
		var text_variable_history = block.getFieldValue('variable_history');
		// TODO: Assemble JavaScript into code variable.
		var code = 'let variable_'+text_variable_id+' = opcuamodelAddVariable (\'ns=1;s=\'+folderId+\'/'+text_variable_id+'\', \''+text_variable_name+'\', folder, namespace, opcua.DataType.'+dropdown_variable_type+');\n';
		if (text_variable_history === 'TRUE') code = code + 'server.engine.addressSpace.installHistoricalDataNode (variable_'+text_variable_id+');\n';
		return code;
	};

	// Blockly.JavaScript['opcuamodel_object'] = function (block) {
	// 	var text_object_name = block.getFieldValue('object_name');
	// 	var text_object_id = block.getFieldValue('object_id');
	// 	var dropdown_object_type = block.getFieldValue('object_type');
	// 	var checkbox_object_history = block.getFieldValue('object_history') == 'TRUE';
	// 	var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
	// 	// TODO: Assemble JavaScript into code variable.
	// 	var code = '...;\n';
	// 	return code;
	// };

	Blockly.JavaScript['opcuamodel_folder'] = function (block) {
		var text_folder_name = block.getFieldValue('folder_name');
		var statements_objects_properties = Blockly.JavaScript.statementToCode(block, 'folder_objects_properties');
		// TODO: Assemble JavaScript into code variable.
		let foldervariable = Blockly.JavaScript.opcuamodel_add_folder (text_folder_name, statements_objects_properties);
		var code = 'opcuamodelAddFolder'+foldervariable+'(folderId, folder, \''+text_folder_name+'\');\n';
		return code;
	};

	Blockly.JavaScript['opcuamodel_template'] = function (block) {
		var text_template_name = block.getFieldValue('template_name');
		var statements_objects_properties = Blockly.JavaScript.statementToCode(block, 'folder_objects_properties');
		// TODO: Assemble JavaScript into code variable.
		let foldervariable = Blockly.JavaScript.opcuamodel_add_template (text_template_name, statements_objects_properties);
		var code = 'opcuamodelAddTemplate'+foldervariable+'(folderId, folder);\n';
		return code;
	};

};