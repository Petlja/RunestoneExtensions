$(document).ready(function () {
    $("[data-level]").each(function (index) { 
        var level=$(this).attr('data-level');
        $(this).parent(".section").addClass('rst-level rst-level-'+level);
    });
});