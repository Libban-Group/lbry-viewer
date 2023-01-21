(fetching, type, params={})=>{
    const container = document.querySelector('#' + type);

    const cb = async (e, change)=>{
        let url = new URL(document.location);
        const page = checkInt(url.searchParams.get('page'));

        if (page === 1 && change < 0) return;
        if (page === max_page && change > 0) return;
        
        url.searchParams.set('page', page + change);

        // Change url
        history.pushState(null, '', url);

        container.innerHTML = '';
        populateFeed(await fetching(params), container);
    }
    document.querySelector('#next1').addEventListener('click', (e)=> {cb(e, 1)});
    document.querySelector('#next2').addEventListener('click', (e)=> {cb(e, 1)});
    document.querySelector('#back1').addEventListener('click', (e)=> {cb(e, -1)});
    document.querySelector('#back2').addEventListener('click', (e)=> {cb(e, -1)});
}