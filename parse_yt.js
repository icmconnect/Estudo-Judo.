const fs = require('fs');
const content = fs.readFileSync('yt_data.json', 'utf8');
const match = content.match(/var ytInitialData = (\{.*?\});/);
if (match) {
  const data = JSON.parse(match[1]);
  fs.writeFileSync('yt_parsed.json', JSON.stringify(data, null, 2));
}
