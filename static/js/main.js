

const data = {
    message: 'Greeting',
    showTitle: true,
    items:[
        'Cras justo odio',
        'Dapibus ac facilisis in',
        'Morbi leo risus',
        'Porta ac consectetur ac',
        'Vestibulum at eros'
    ]
};

new Vue({
    el: '#app',
    data: data
});

// v-show v-if v-else

Vue.filter('getUpper', function(value) {
    return value.upvotes > 50
});

// Using Components

Vue.component('story-heading', {
    template: '#story-heading'
});

Vue.component('story', {
    props: ['item'],
    data: function() {
        console.log(this);
        return {
            a: this.item
        }
    },
    template: "<h1 class=\"heading\">{{item.writer}} said {{ item.plot}} and upvoted {{item.upvotes}} times.</h1>"
});

const imgsrc = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_161e474498b%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_161e474498b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
Vue.component('bs-card', {
    template: `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imgsrc}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`
})

const app2 = new Vue({
    el: '#app2',
    data: {
        stories: [
            {
            plot: "I crashed my car today!",
            writer: "Alex",
            upvotes: 28
            },
            {
            plot: "Yesterday, someone stole my bag!",
            writer: "John",
            upvotes: 8
            },
            {
            plot: "Someone ate my chocolate...",
            writer: "John",
            upvotes: 51
            },
            {
            plot: "I ate someone's chocolate!",
            writer: "Alex",
            upvotes: 74
        }],
        a: 1,
        candidates: [
            {name: "Mr. Black", votes: 140},
            {name: "Mr. White", votes: 135},
            {name: "Mr. Pink", votes: 145},
            {name: "Mr. Brown", votes: 130},
        ]
    },
    methods: {
        order: function() {
            this.stories = this.stories.reverse();
        },
        double: function() {
            this.a *= 2;
        },
        chooseImage: function(e) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            console.log('-----', formData, file)
            axios({
                method: 'post',
                url: '/upload',
                headers: {
                    'content-type': 'multipart/form-data'
                },
                data: formData
                
            })
   
        }
    },
    computed: {
        b: function() {
            return this.a + 2;
        },
        famouse: function() {
            return this.stories.filter(d => d.upvotes > 50)
        },
        mayor: function () {
            //first we sort the array descending
            // var candidatesSorted = this.candidates.sort(function (a, b) {
            //     return b.votes - a.votes;
            // });
            //the mayor will be the first item
            // return candidatesSorted[0];
        }
    }
})

