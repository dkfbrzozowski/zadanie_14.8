var GIPHY_PUB_KEY = '69aHGbJoqsxgRYNH7rn6l4OMKtOY0V7z',
    GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    getGif: function(searchingText, callback) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif = {};

                if(data.length !== 0) {
                    gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url,
                    };
                } else {
                    gif = {
                        url: 'nonMatches.png',
                        sourceUrl: '',
                    };
                }
                callback(gif);
            }
        };
        xhr.send();
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif loading={this.state.loading} url={this.state.gif.url} sourceUrl={this.state.gif.sourceUrl} />
          </div>
        );
    }
});