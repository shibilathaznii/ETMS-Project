let requests = [

    

    

];


document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayRequests();

    }
);


/* DISPLAY */

function displayRequests() {

    let tbody =
        document.getElementById("leaveTableBody");

    let filter =
        document.getElementById("statusFilter").value;

    tbody.innerHTML = "";


    let filtered =
        requests.filter(function(request) {

            return filter === "All" ||
                   request.status === filter;

        });


    filtered.forEach(function(request,index) {

        let total =
            request.medical + request.general;

        let available =
            total - request.used;


        let proof = request.proof
            ? `<a href="${request.proof}"
                    target="_blank"
                    class="proof-btn">
                    <i class="fa-solid fa-file"></i>
                    View
               </a>`
            : "No Proof";


        let action = `

            <button
                class="balance-btn"
                onclick="viewBalance(${request.id})">

                <i class="fa-solid fa-wallet"></i>
                Balance

            </button>
        `;


        if(request.status === "Pending") {

            action += `

                <button
                    class="approve-btn"
                    onclick="approveRequest(${request.id})">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button
                    class="reject-btn"
                    onclick="rejectRequest(${request.id})">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            `;

        }


        if(request.status === "Approved") {

            action += `

                <button
                    class="forward-btn"
                    onclick="forwardToAdmin(${request.id})">

                    <i class="fa-solid fa-paper-plane"></i>
                    Forward

                </button>

            `;

        }


        tbody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>
                    <b>${request.employee}</b>
                </td>

                <td>${request.department}</td>

                <td>${request.type}</td>

                <td>${request.from}</td>

                <td>${request.to}</td>

                <td>${request.days}</td>

                <td>

                    <button
                        class="balance-btn"
                        onclick="viewBalance(${request.id})">

                        ${available} Days

                    </button>

                </td>

                <td>${proof}</td>

                <td>

                    <span class="status
                        ${request.status.toLowerCase()}">

                        ${request.status}

                    </span>

                </td>

                <td>${action}</td>

            </tr>

        `;

    });


    updateSummary();

}


/* VIEW BALANCE */

function viewBalance(id) {

    let request =
        requests.find(r => r.id === id);

    if(!request) return;


    let total =
        request.medical + request.general;

    let available =
        total - request.used;


    document.getElementById("balanceEmployee")
        .innerText = request.employee;

    document.getElementById("balanceDepartment")
        .innerText = request.department;


    document.getElementById("medicalBalance")
        .innerText = request.medical;

    document.getElementById("generalBalance")
        .innerText = request.general;

    document.getElementById("totalBalance")
        .innerText = available;

    document.getElementById("totalQuota")
        .innerText = total;

    document.getElementById("usedLeave")
        .innerText = request.used;

    document.getElementById("availableLeave")
        .innerText = available;


    document.getElementById("balanceModal")
        .style.display = "flex";

}


/* CLOSE BALANCE */

function closeBalance() {

    document.getElementById("balanceModal")
        .style.display = "none";

}


/* APPROVE */

function approveRequest(id) {

    let request =
        requests.find(r => r.id === id);

    if(!request) return;


    if(request.days >
       (request.medical + request.general - request.used)) {

        alert(
            "Employee does not have enough leave balance."
        );

        return;

    }


    request.status = "Approved";


    alert(
        request.employee +
        "'s leave request approved."
    );


    displayRequests();

}


/* REJECT */

function rejectRequest(id) {

    let request =
        requests.find(r => r.id === id);

    if(!request) return;


    request.status = "Rejected";


    alert(
        request.employee +
        "'s leave request rejected."
    );


    displayRequests();

}


/* FORWARD TO ADMIN */

function forwardToAdmin(id) {

    let request =
        requests.find(r => r.id === id);

    if(!request) return;


    if(request.status !== "Approved") {

        alert(
            "Only approved requests can be forwarded."
        );

        return;

    }


    request.status = "Forwarded";


    alert(
        "Leave request forwarded to Admin successfully."
    );


    displayRequests();

}


/* SUMMARY */

function updateSummary() {

    document.getElementById("totalRequests")
        .innerText = requests.length;


    document.getElementById("pendingRequests")
        .innerText =
        requests.filter(
            r => r.status === "Pending"
        ).length;


    document.getElementById("approvedRequests")
        .innerText =
        requests.filter(
            r => r.status === "Approved"
        ).length;


    document.getElementById("forwardedRequests")
        .innerText =
        requests.filter(
            r => r.status === "Forwarded"
        ).length;

}