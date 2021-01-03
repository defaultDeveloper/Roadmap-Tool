let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

document.getElementById('button').addEventListener("click", () => {
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
                //   document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)

                // let projectNames = new Array();
                // rowObject.each(function (proj) {
                //     if (jQuery.inArray(proj.ProjectName, projectNames) > -1) {
                //         projectNames.push(proj.ProjectName);
                //         let newProject = {
                //             ProjectName: proj.ProjectName,
                //             ProjectDescription: proj.ProjectDescription,
                //             StartDate: proj.StartDate,
                //             EndDate: proj.EndDate,
                //             ProjectStatus: proj.ProjectStatus
                //         }
                //     }
                //     else {
                //     }
                // })

                let projectNames = new Array();
                let projectClean = new Array();
                let milestoneValues = new Array();

                $.each(rowObject, function (projId, projValue) {
                    if ($.inArray(projValue.ProjectName, projectNames) == -1) {
                        let otherValues = {
                            milestones: projValue.Milestones,
                            duedate: projValue.DueDate,
                            milestonestatus: projValue.MilestoneStatus
                        }
                        milestoneValues.push(otherValues);
                        projectNames.push(projValue.ProjectName);
                        projectClean.push(projValue);
                    }
                });
                console.log(projectNames);
                console.log(projectClean);
                console.log(milestoneValues);
                return projectClean;

                // var header = Object.keys(rowObject[0])[0];
                // document.getElementById("header").innerHTML = header;

                // for (var i = 0; i < rowObject.length; i++) {
                //     document.getElementById("demo").innerHTML += rowObject[i]["Project Name"] + "<br>";
                // }
            });
        }
    }
});

function myFunction() {
    var x = document.getElementById("hideDIV");
    x.style.display = "none";
}
