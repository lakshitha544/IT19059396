$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
	{ 
		$("#alertSuccess").hide(); 
	} 
	$("#alertError").hide(); 
}); 

//SAVE
$(document).on("click", "#btnSave", function(event)
{ 
	// Clear alerts---------------------
	 $("#alertSuccess").text(""); 
	 $("#alertSuccess").hide(); 
	 $("#alertError").text(""); 
	 $("#alertError").hide();
 
	// Form validation-------------------
	var status = validateresearcherForm(); 
	if (status != true) 
	{ 
		$("#alertError").text(status); 
		$("#alertError").show(); 
		return; 
 	} 

	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT"; 
	 $.ajax( 
	 { 
	 url : "ResearcherAPI", 
	 type : type, 
	 data : $("#formItem").serialize(), 
	 dataType : "text", 
	 complete : function(response, status) 
	 { 
	 	onResearcherSaveComplete(response.responseText, status); 
	 } 
 }); 
});

function onResearcherSaveComplete(response, status)
{ 
	if (status == "success") 
	{ 
		 var resultSet = JSON.parse(response); 
		 if (resultSet.status.trim() == "success") 
		 { 
		 $("#alertSuccess").text("Successfully saved."); 
		 $("#alertSuccess").show(); 
		 $("#divItemsGrid").html(resultSet.data); 
		 } else if (resultSet.status.trim() == "error") 
		 { 
		 $("#alertError").text(resultSet.data); 
		 $("#alertError").show(); 
		 } 
		 } else if (status == "error") 
		 { 
		 $("#alertError").text("Error while saving."); 
		 $("#alertError").show(); 
		 } else
		 { 
		 $("#alertError").text("Unknown error while saving.."); 
		 $("#alertError").show(); 
		 } 
		 $("#hidItemIDSave").val(""); 
		 $("#formItem")[0].reset(); 
	}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{ 
	 $("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val()); 
	 $("#name").val($(this).closest("tr").find('td:eq(0)').text()); 
	 $("#address").val($(this).closest("tr").find('td:eq(1)').text()); 
	 $("#email").val($(this).closest("tr").find('td:eq(2)').text()); 
	 $("#projectName").val($(this).closest("tr").find('td:eq(3)').text()); 
	 $("#projectType").val($(this).closest("tr").find('td:eq(4)').text()); 
});

// CLIENT-MODEL================================================================
function validateresearcherForm() 
{ 
	// NAME
	if ($("#name").val().trim() == "") 
	{ 
	 	return "Insert name."; 
	} 
	// ADDRESS
	if ($("#address").val().trim() == "") 
	{ 
	 	return "Insert address."; 
	}
	// EMAIL-------------------------------
	if ($("#email").val().trim() == "") 
	{ 
	 	return "Insert email."; 
	} 
	// PROJECT NAME------------------------
	if ($("#projectName").val().trim() == "") 
	{ 
	 	return "Insert project name."; 
	} 
	// PROJECT TYPE------------------------
	if ($("#projectType").val().trim() == "") 
	{ 
	 	return "Insert project type."; 
	} 
	return true;
}

$(document).on("click", ".btnRemove", function(event)
{ 
	 $.ajax( 
	 { 
		 url : "ResearcherAPI", 
		 type : "DELETE", 
		 data : "researcherID=" + $(this).data("rid"),
		 dataType : "text", 
	 complete : function(response, status) 
	 { 
	 	onResearcherDeleteComplete(response.responseText, status); 
	 } 
 }); 
});

function onResearcherDeleteComplete(response, status)
{ 
if (status == "success") 
	 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
	 { 
	 $("#alertSuccess").text("Successfully deleted."); 
	 $("#alertSuccess").show(); 
	 $("#divItemsGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
	 { 
	 $("#alertError").text(resultSet.data); 
	 $("#alertError").show(); 
	 } 
	 } else if (status == "error") 
	 { 
	 $("#alertError").text("Error while deleting."); 
	 $("#alertError").show(); 
	 } else
	 { 
	 $("#alertError").text("Unknown error while deleting.."); 
	 $("#alertError").show(); 
	 } 
}