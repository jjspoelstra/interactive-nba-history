# Interactive-History-of-the-NBA
This project showcases a year-by-year history of the NBA. I set out to create a site that takes some of the statistical power of a site like basketball refernce, and combines it with a visual context, rather that lines and lines of data. Too often, information is spread across multiple locations and it is hard to paint a full picture. 

<img src="https://github.com/jjspoelstra/jjspoelstra/raw/main/images/newGifNBA.gif" />


# How It's Made:
Tech used: EJS, CSS, JavaScript, Node, Express, Puppeteer

My learning was focused on scraping data to create my database of player, team, and league information. I originally had the website coded in seperate HTML files, with server-side JS fetching player data. Since then, I have utilized a backend to grab the data from, and render it using ejs. 

# Optimizations
So far, there is a simple interface. As I continue, the website will contain pages for each season of the league. 
Media queries need to be optimized furhter, so that mobile users will have an enjoyable experience using the website as well. 
This client-side portion of this project will eventually be ported to React. 

# Lessons Learned:
Scraping capabilities and how finnicky and inconsistent the websites can be in terms of where data is kept. It is not always uniform, so we have to find ways to work around this inconsistency. 
Pros and Cons of EJS as a templating language - useful for smaller applications, but large pages become cumbersome. 
Realized that, for certain elements, creating a CSS hover state is simpler and more concise than adding an event listener to each individual element. 



