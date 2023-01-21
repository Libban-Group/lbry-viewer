(text)=>{
    const md = window.markdownit();

    const markdown = document.createElement('div');
    markdown.classList.add('markdown');
    markdown.classList.add('stream');
    markdown.innerHTML = md.render(text);
    console.log(markdown);
    return markdown;
}