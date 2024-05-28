$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);

    var filters = {
        name: urlParams.get('name') || "",
        age: urlParams.get('age') || "",
        email: urlParams.get('email') || ""
    };

    var sortType = urlParams.get('sort') || "nameAsc";

    var url = "https://randomuser.me/api/?results=10";
    var radioValue = urlParams.get('gender') || "all";
    var selectedNationality = urlParams.get('nat') || "AU";
    var loadMore;

    fetchInformation(url);

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    var searchUsers = debounce(function() {
        var searchInput = $('#search').val().toLowerCase();
        if (searchInput !== "") {
            $("#result .person-info").each(function() {
                var userName = $(this).find('span:nth-child(2)').text().toLowerCase();
                if (userName.includes(searchInput)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            $("#result .person-info").show();
        }
    }, 300);
    $('#search').on('input', searchUsers);
    $('#sort').on('change', function() {
        sortType = $(this).val();
        updateURL();
        sortUsers(sortType);
    });
    $('#nameFilter, #ageFilter, #emailFilter').on('input', function() {
        updateURL();
        filterUsers();
    });
    $("input[type='radio']").click(function(){
        radioValue = $("input[name='gender']:checked").val();
        selectedNationality = $('#nationality :selected').val();
        $("#result").empty();
        updateURL();
        fetchInformation(url);
    });

    $('#nationality').on('change', function() {
        updateURL();
        $("#result").empty();
        selectedNationality = $('#nationality :selected').val();
        url = "https://randomuser.me/api/?results=10&gender=" + radioValue + "&nat=" + selectedNationality;
        fetchInformation(url);
    });

    function fetchInformation(url) {
        fetch(url)
            .then(response => response.json())
            .then(function(data){
                data.results.forEach(person => {
                    var dateOfBirth = new Date(person.dob.date);
                    var ageDate = new Date(Date.now() - dateOfBirth.getTime());
                    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

                    var p = `<div class="person-info">
                    <img src="${person.picture.medium}" class="img-rounded" alt="image" />
                    <span>${person.name.first} ${person.name.last}</span>   
                    <span> (${person.nat})</span> 
                    <span> Age: ${age}</span>            
                    <span>Email: ${person.email}</span>
                    </div>`;
                    $("#result").append(p);
                });
                sortUsers($('#sort').val());

                loadMore = `<button id="loadMore" class="btn btn-primary">Load More</button>`;
                $("#result").append(loadMore);
                $('#loadMore').on('click', function() {
                    fetchInformation(url);
                    $(this).remove();
                });
            });
    }

    function sortUsers(sortType) {
        var $users = $("#result .person-info");
        $users.sort(function(a, b) {
            var aValue, bValue;
            switch (sortType) {
                case 'nameAsc':
                    aValue = $(a).find('span:nth-child(2)').text().toLowerCase();
                    bValue = $(b).find('span:nth-child(2)').text().toLowerCase();
                    return aValue.localeCompare(bValue);
                case 'nameDesc':
                    aValue = $(a).find('span:nth-child(2)').text().toLowerCase();
                    bValue = $(b).find('span:nth-child(2)').text().toLowerCase();
                    return bValue.localeCompare(aValue);
                case 'ageAsc':
                    aValue = parseInt($(a).find('span:nth-child(4)').text().split(':')[1].trim());
                    bValue = parseInt($(b).find('span:nth-child(4)').text().split(':')[1].trim());
                    return aValue - bValue;
                case 'ageDesc':
                    aValue = parseInt($(a).find('span:nth-child(4)').text().split(':')[1].trim());
                    bValue = parseInt($(b).find('span:nth-child(4)').text().split(':')[1].trim());
                    return bValue - aValue;
            }
        });
        $("#result").html($users);
    }

    function filterUsers() {
        var nameFilter = $('#nameFilter').val().toLowerCase();
        var ageFilter = $('#ageFilter').val();
        var emailFilter = $('#emailFilter').val().toLowerCase();

        $("#result .person-info").each(function() {
            var $userCard = $(this);
            var userName = $userCard.find('span:nth-child(2)').text().toLowerCase();
            var userAge = parseInt($userCard.find('span:nth-child(4)').text().split(':')[1].trim());
            var userEmail = $userCard.find('span:nth-child(5)').text().toLowerCase();

            var nameMatch = nameFilter === "" || userName.includes(nameFilter);
            var ageMatch = ageFilter === "" || userAge.toString().startsWith(ageFilter);
            var emailMatch = emailFilter === "" || userEmail.includes(emailFilter);

            if (nameMatch && ageMatch && emailMatch) {
                $userCard.show();
            } else {
                $userCard.hide();
            }
        });
    }

    function updateURL() {
        var searchParams = new URLSearchParams();

        if (filters.name !== "") searchParams.set('name', filters.name);
        if (filters.age !== "") searchParams.set('age', filters.age);
        if (filters.email !== "") searchParams.set('email', filters.email);

        searchParams.set('sort', sortType);
        searchParams.set('gender', radioValue);
        searchParams.set('nat', selectedNationality);

        window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
    }
});
