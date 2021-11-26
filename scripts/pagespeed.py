import requests
import sys
import json

base_url = (
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?"
    "key=AIzaSyALFDbsEN5WbzxEwQQDNcoHWvYf3Jb44og"
    "&category=ACCESSIBILITY"
    "&category=BEST_PRACTICES"
    "&category=PERFORMANCE"
    "&category=SEO"
)

desktop = base_url + "&strategy=DESKTOP&url="
mobile = base_url + "&strategy=MOBILE&url="


def send_request(url: str, strat: str) -> str:
    if strat == "desktop":
        final_url = desktop + url
    if strat == "mobile":
        final_url = mobile + url

    print(final_url)
    res = requests.get(final_url)
    if res.status_code != 200:
        return print(json.dumps(res.json(), indent=4))

    categories = res.json()["lighthouseResult"]["categories"]

    print("\n" + url)
    print("STRATEGY".rjust(14), ":", strat.upper())
    for category in categories:
        title = categories[category]["title"].rjust(14)
        score = str(int(categories[category]["score"] * 100)).rjust(3)
        print(title, ":", score)


site = sys.argv[1] if len(sys.argv) >= 2 else ""
page = sys.argv[2] if len(sys.argv) >= 3 else ""

if site == "aws":
    site = "https://staging.prepnow.app/" + page
elif site == "php":
    site = "https://securemyscholarship.com/" + page
elif site == "vercel":
    site = "https://sms-website.vercel.app/" + page

print("\n----------------------------------------")
send_request(site, "desktop")
print("\n----------------------------------------")
send_request(site, "mobile")
print("\n----------------------------------------")

# Example:

# py pagespeed.py aws
# py pagespeed.py php
# py pagespeed.py vercel

# py pagespeed.py aws universities
# py pagespeed.py php university
# py pagespeed.py vercel universities

# py pagespeed.py https://staging.prepnow.app
# py pagespeed.py https://staging.prepnow.app/universities
