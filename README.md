# Interactive-History-of-the-NBA
This project showcases the year-by-year history of the NBA. I set out to create a site that takes some of the statistical power of a site like basketball-reference and combines it with a visual context, rather than lines and lines of data. Too often, information is spread across multiple locations and it is hard to paint a full picture. 

<img src="https://github.com/jjspoelstra/jjspoelstra/raw/main/images/newGifNBA.gif" />


# How It's Made:
Tech used: EJS, CSS, JavaScript, Node, Express, Puppeteer

My learning was focused on scraping data to create my database of player, team, and league information. I originally had the website coded in separate HTML files, with server-side JS fetching player data. Since then, I have utilized a backend to grab the data from and render it using ejs. 

# Optimizations
This project is currently being updated to run with Next.JS rather than through EJS.
So far, there is a simple interface. The UI portion of the site will be updated along with the Next.js port.
Media queries need to be optimized further so that mobile users will have an enjoyable experience using the website as well. 

There are some issues with games registering as the wrong color, or being credited next to a certain team. I expect this issue would be easier to fix with Next than within EJS. 

After the transition, I will begin to implement community involvement (ex: commenting on series, teams, various events across the league through history)

# Lessons Learned:
Scraping capabilities and how finicky and inconsistent the websites can be in terms of where data is kept. It is not always uniform, so we have to find ways to work around this inconsistency. 
Pros and Cons of EJS as a templating language - useful for smaller applications, but large pages become cumbersome. 
Realized that, for certain elements, creating a CSS hover state is simpler and more concise than adding an event listener to each individual element. 



