const axios = require('axios')

const url = "https://tickets.paris2024.org/api/shoppingCart/"

const headers1 = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Content-Length': 338,
    'Content-Type': 'application/json',
    'Cookie': '__cmpiuid=134840370ec68bca7c6280691cf00a96; __cmpcvcx48919=__s94_c24102_s23_s1_s26_s135_s905_c30433_U__; __cmpcpcx48919=__1_2_3__; __cmpcvc=__s94_c24102_s23_s1_s26_s135_s905_c30433_U__; __cmpcpc=__1_2_3__; __cmpiab=__388_32_; __cmpiabli=__388_32_; __troRUID=c5ecdf66-13ad-491b-be5d-bec29cae849a; _fbp=fb.1.1696169233209.598435619; _tt_enable_cookie=1; _ttp=jSLUrjyS9Y2myJIoxeMtzXlkx2K; _scid=a5abec9f-738f-401a-94da-b988c1b5caf3; __cmpconsentx48919=BPzABBaPzABBaAfOXBFRABAAAAAYSACABAAYQA; _gid=GA1.2.655161231.1698163652; _gcl_au=1.1.909327382.1696169233.1802130837.1698163778.1698163777; __troSYNC=1; permInfo=1693897270531630826A25102023A26102023; QueueITAccepted-SDFrts345E-V3_p24web0507=EventId%3Dp24web0507%26QueueId%3Dbd32341f-4261-43be-bb0c-be2817b4d5ab%26RedirectType%3Dsafetynet%26IssueTime%3D1698314883%26Hash%3D8f689b455c87524666c81e334596c64288e38cf43db0e0a32226438fa86eae74; bm_sz=F12B8B25EE496CD3F930FD31F87C59C9~YAAQCg0VAgL8NGCLAQAAXEPPaxVYNgGWAq8UA2Q4diG625d++uXyg26jhBo1DcZN6TpaF1TFaB3jz7/R35+hWim+QYgfJDo55NS4YQQ5deqE4W0hjtglceisV8y6kCxm1QbuQ72s/hI8dyqdTeB0Gq/dvmENKwSLHOFtKqCEkP24mAU/YbxkuhE77rpMTo5WPAtyQpricOTeX+foE7lH4y9+atGfRijfoBHrojp5yJ09Fguf1WOUlJJVdZqnNl29TZz492aG2jizdmViNHgp4dbbLGnjzT77U9OQU8iK2yCjs1w6azE=~3294021~3551300; _abck=A6A2BB76398A5037916C0A9CCCA086F1~0~YAAQCg0VAgn8NGCLAQAAukjPawrpCIce0r+JzulLe34t3TUrYQgcHJ6X2hy5xhJfMbgdlbGodilAaT93wixxCg/8TMlhjMG5Py0wYwLuigx3ELgHhc8czkRQS83XWEF+Bx0a4jQM5gw4qiYs4xTrpzUSRRmjjKVw6+h3gnnMFjQifzC95ituPxz0kuDv80z5z9Z6Cw7CvNZzVIDos6G3qlCsTKUofMbFUPjz54AdLw7jI9Iar2xGlxPiH4UYza6D2JZFpbnayHcnU79zig5YekZJ6YSXUmdOFtyNQA6wYYx0Kwn+y1q5PEJcjkAfDTjx31Vv5TV74BqomTHmgXgd0rAHV572h32XGoIjWWRx9KNTwSHYsFaqa6g287mY5r9mzrqcTCdCOQr7p5wsfqBVbj8vkCM5zcyF9v+x4A==~-1~-1~1698324326; ak_bmsc=1AD4F0BBEDE80AC57A7D20291B48BABE~000000000000000000000000000000~YAAQCg0VAhn8NGCLAQAAq1DPaxWfpAXa9KFu7p8N6SY34mhHzxKBS256BHvn9pU2OoW1bQCsOkwXCVX6cEhKgczXtDesu/v5gE24P0uf2UnhK6x4mx8Fqq710LjNyKCu0bXOMWcNgEImExLYhYNVGFrwgSYOelT1+KIMLIsgEBS3ThnADJOkHxExwM8+w4NQnuzrpeHVCipILSxJAj/+qJdrYiVIl660ZMwVJdJnNOYGZkIfonrm0qgv0EQxQYhkRvw4G+5WHChr/04mErIbG8Ts2LdGyJ0ERcNOBhNNuTnCZhm+TKVBugJr9/1d4HXZlKMRsfYT5V6fF/awD65Ucoz2G1dF42AYD123IXCyfneIVnd0vByPjMdV9uJEH2iGtR6utfo7E1cQsKW+GAd5Blw7H9wIdgL9hrIyF/e+4f1cktCD+5/ZykCHwTKXME7voyg0ucS+CeStrT9cJOJVsLWSNnAmzQjgcYsb+UszikGhh/4v+I9Yeh2kwGGKhvZIJgsz5M7LGflYwtiI74D0HBGNwK6bufz74cOLqQY=; _ga_91YG64Y5B0=GS1.2.1698320858.9.0.1698320858.0.0.0; QueueITAccepted-SDFrts345E-V3_p24queue0=EventId%3Dp24queue0%26QueueId%3D02b00d89-32d9-4906-b418-f58ee28f9003%26RedirectType%3Dsafetynet%26IssueTime%3D1698320870%26Hash%3Dd6f70772f81df0923600aa60ce3e8729e4e0161b0048c82377381f0652e5c376; 24R.webid=MjRSMzdQSDNRTkpQMDc5NTA5MjY5MlFDX0ZS; 24R.web_cb_info=xNq2plebNrE=-xNq2plebNrE=; 24R.webshop=YW1vdW50PTAmYW1vdW50X2V2aWRzPTAmY3VycmVuY3lfY29kZT1FVVImY3VycmVuY3lfc3ltYm9sPSUyNmV1cm8lM0ImZGV2aWNlX2luZm89MCZldmlkc19pbl9jYXJ0PSZldm9fbXljbHVic19tZW1iZXI9JmV4dGVybmFsX2lkcz0lN0IlN0NnaWd5YSU3QyUzQSU1QiU3QiU3Q2lkJTdDJTNBJTdDN2IyMTU1N2VlMDg5NDk5NTg0MzRmZDU2MGNlZTM4NGIlN0MlN0QlNUQlN0QmZmlyc3RfbmFtZT1EYXZpZCZrY3N1Yj1mJTNBYmIwNzNlMzItNDM4NC00MTUzLWFkNWMtMTgzYWViZDYzZWM2JTNBMTM3NTI5NDYyOCZrZXk9aHJtN3VlOHBXekVNJmtwc191cmw9Jmxhbmd1YWdlPWZyJmxhc3RfbmFtZT1NaWFyYSZsb2NhbGU9ZnJfZnImbG9naW49MSZtZXJraXRlbXM9MCZwa2lkc19pbl9jYXJ0PSZwcmljZT0wLjAwJnByaWNlX2Zvcm1hdHRlZD0wJTJDMDAmcmFuZG9tPTg3NDAyJnJhcD0wJnJlZmVyZXI9aHR0cHMlM0ElMkYlMkZ0aWNrZXRzLnBhcmlzMjAyNC5vcmclMkZzZWFyY2glMkYlM0ZhZmZpbGlhdGUlM0QyNFImcmVzZXJ2YXRpb25fZHVyYXRpb249MCZ0aWNrZXRhbW91bnRfcHJpY2VzX3BraWQ9JnRva2VuPVZXV1pRUVlWSkJHS09BVg==; SameSite=None; 24A.webid=MjRBX05PX1NFU1NJT05fRlI=; 24A.webshop=bG9naW49MCZldm9fbXljbHVic19tZW1iZXI9JnByaWNlPTAuMDAmYW1vdW50PTAmbWVya2l0ZW1zPTAmcmVzZXJ2YXRpb25fZHVyYXRpb249MCZrcHNfdXJsPSZhbW91bnRfZXZpZHM9MCZwa2lkc19pbl9jYXJ0PSZldmlkc19pbl9jYXJ0PSZ0aWNrZXRhbW91bnRfcHJpY2VzX3BraWQ9JnJhbmRvbT0yNzQ1MyZyZWZlcmVyPSZrZXk9aldHRHZFZG1LQ0pVJmRldmljZV9pbmZvPTAmbGFuZ3VhZ2U9ZnImbG9jYWxlPWZyX2ZyJnByaWNlX2Zvcm1hdHRlZD0wJTJDMDAmY3VycmVuY3lfY29kZT1FVVImY3VycmVuY3lfc3ltYm9sPSUyNmV1cm8lM0ImdG9rZW49UlJRQlRFQkVGTlRQSElW; _dc_gtm_UA-78684294-121=1; ADRUM_BTa=R:51|g:d8f9e580-e168-4d5c-ae78-9172b67d00db|n:customer1_3aa627d9-4de0-48ca-a644-db85ae91343a; ADRUM_BT1=R:51|i:2496|e:117; _ga=GA1.2.1393896297.1696169233; _scid_r=a5abec9f-738f-401a-94da-b988c1b5caf3; bm_sv=2EF630E55FD8939E77E4CBD9968AB3BA~YAAQNQ0VAiRe+WqLAQAA6+vQaxXBAlIFxV/YBVxHw0SXhQs6maGY8t0AJBlCwdgQIzk2zLhlpypCogzMQDD0Tk3zmiggL6tjBfJ4/whqtUeOzI47IouCGV2fL6SWzoPf9IzqOcpl/3Bdqt+LNKfhjzKgNjiyRmhoqiw1bOu3OoseXyblCq13hEr2F1STGK7ej0CpAVvoMlFn5J0xIRm9fhl4eyqHcVMZQ0IvIOQrf+S8VVLUnyLDCBKtcEmR5GduNkCuNA==~1; _ga_J21KVL22SE=GS1.1.1698304242.5.1.1698320944.0.0.0; __trossion=1694284540_1800_12_c5ecdf66-13ad-491b-be5d-bec29cae849a%3A1698307544_c5ecdf66-13ad-491b-be5d-bec29cae849a%3A1698320827_1698320944_8_',
    'Origin': 'https://tickets.paris2024.org',
    'Referer': 'https://tickets.paris2024.org/event/football-stade-de-lyon-15782675/?affiliate=24R',
    'sec-ch-ua': 'Chromium";v="118", "Microsoft Edge";v="118", "Not=A?Brand";v="99',
    'sec-ch-ua-mobile': '?O',
    'sec-ch-ua-platform': 'Windows',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61',
    'X-Requested-With': 'XMLHttpRequest',
}
const headers2 = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Content-Length': 338,
    'Content-Type': 'application/json',
    'Cookie': '__cmpiuid=134840370ec68bca7c6280691cf00a96; __cmpcvcx48919=__s94_c24102_s23_s1_s26_s135_s905_c30433_U__; __cmpcpcx48919=__1_2_3__; __cmpcvc=__s94_c24102_s23_s1_s26_s135_s905_c30433_U__; __cmpcpc=__1_2_3__; __cmpiab=__388_32_; __cmpiabli=__388_32_; __troRUID=c5ecdf66-13ad-491b-be5d-bec29cae849a; _fbp=fb.1.1696169233209.598435619; _tt_enable_cookie=1; _ttp=jSLUrjyS9Y2myJIoxeMtzXlkx2K; _scid=a5abec9f-738f-401a-94da-b988c1b5caf3; __cmpconsentx48919=BPzABBaPzABBaAfOXBFRABAAAAAYSACABAAYQA; _gid=GA1.2.655161231.1698163652; _gcl_au=1.1.909327382.1696169233.1802130837.1698163778.1698163777; __troSYNC=1; permInfo=1693897270531630826A25102023A26102023; QueueITAccepted-SDFrts345E-V3_p24web0507=EventId%3Dp24web0507%26QueueId%3Dbd32341f-4261-43be-bb0c-be2817b4d5ab%26RedirectType%3Dsafetynet%26IssueTime%3D1698314883%26Hash%3D8f689b455c87524666c81e334596c64288e38cf43db0e0a32226438fa86eae74; bm_sz=F12B8B25EE496CD3F930FD31F87C59C9~YAAQCg0VAgL8NGCLAQAAXEPPaxVYNgGWAq8UA2Q4diG625d++uXyg26jhBo1DcZN6TpaF1TFaB3jz7/R35+hWim+QYgfJDo55NS4YQQ5deqE4W0hjtglceisV8y6kCxm1QbuQ72s/hI8dyqdTeB0Gq/dvmENKwSLHOFtKqCEkP24mAU/YbxkuhE77rpMTo5WPAtyQpricOTeX+foE7lH4y9+atGfRijfoBHrojp5yJ09Fguf1WOUlJJVdZqnNl29TZz492aG2jizdmViNHgp4dbbLGnjzT77U9OQU8iK2yCjs1w6azE=~3294021~3551300; _abck=A6A2BB76398A5037916C0A9CCCA086F1~0~YAAQCg0VAgn8NGCLAQAAukjPawrpCIce0r+JzulLe34t3TUrYQgcHJ6X2hy5xhJfMbgdlbGodilAaT93wixxCg/8TMlhjMG5Py0wYwLuigx3ELgHhc8czkRQS83XWEF+Bx0a4jQM5gw4qiYs4xTrpzUSRRmjjKVw6+h3gnnMFjQifzC95ituPxz0kuDv80z5z9Z6Cw7CvNZzVIDos6G3qlCsTKUofMbFUPjz54AdLw7jI9Iar2xGlxPiH4UYza6D2JZFpbnayHcnU79zig5YekZJ6YSXUmdOFtyNQA6wYYx0Kwn+y1q5PEJcjkAfDTjx31Vv5TV74BqomTHmgXgd0rAHV572h32XGoIjWWRx9KNTwSHYsFaqa6g287mY5r9mzrqcTCdCOQr7p5wsfqBVbj8vkCM5zcyF9v+x4A==~-1~-1~1698324326; ak_bmsc=1AD4F0BBEDE80AC57A7D20291B48BABE~000000000000000000000000000000~YAAQCg0VAhn8NGCLAQAAq1DPaxWfpAXa9KFu7p8N6SY34mhHzxKBS256BHvn9pU2OoW1bQCsOkwXCVX6cEhKgczXtDesu/v5gE24P0uf2UnhK6x4mx8Fqq710LjNyKCu0bXOMWcNgEImExLYhYNVGFrwgSYOelT1+KIMLIsgEBS3ThnADJOkHxExwM8+w4NQnuzrpeHVCipILSxJAj/+qJdrYiVIl660ZMwVJdJnNOYGZkIfonrm0qgv0EQxQYhkRvw4G+5WHChr/04mErIbG8Ts2LdGyJ0ERcNOBhNNuTnCZhm+TKVBugJr9/1d4HXZlKMRsfYT5V6fF/awD65Ucoz2G1dF42AYD123IXCyfneIVnd0vByPjMdV9uJEH2iGtR6utfo7E1cQsKW+GAd5Blw7H9wIdgL9hrIyF/e+4f1cktCD+5/ZykCHwTKXME7voyg0ucS+CeStrT9cJOJVsLWSNnAmzQjgcYsb+UszikGhh/4v+I9Yeh2kwGGKhvZIJgsz5M7LGflYwtiI74D0HBGNwK6bufz74cOLqQY=; _ga_91YG64Y5B0=GS1.2.1698320858.9.0.1698320858.0.0.0; QueueITAccepted-SDFrts345E-V3_p24queue0=EventId%3Dp24queue0%26QueueId%3D02b00d89-32d9-4906-b418-f58ee28f9003%26RedirectType%3Dsafetynet%26IssueTime%3D1698320870%26Hash%3Dd6f70772f81df0923600aa60ce3e8729e4e0161b0048c82377381f0652e5c376; 24R.webid=MjRSMzdQSDNRTkpQMDc5NTA5MjY5MlFDX0ZS; 24R.web_cb_info=xNq2plebNrE=-xNq2plebNrE=; 24R.webshop=YW1vdW50PTAmYW1vdW50X2V2aWRzPTAmY3VycmVuY3lfY29kZT1FVVImY3VycmVuY3lfc3ltYm9sPSUyNmV1cm8lM0ImZGV2aWNlX2luZm89MCZldmlkc19pbl9jYXJ0PSZldm9fbXljbHVic19tZW1iZXI9JmV4dGVybmFsX2lkcz0lN0IlN0NnaWd5YSU3QyUzQSU1QiU3QiU3Q2lkJTdDJTNBJTdDN2IyMTU1N2VlMDg5NDk5NTg0MzRmZDU2MGNlZTM4NGIlN0MlN0QlNUQlN0QmZmlyc3RfbmFtZT1EYXZpZCZrY3N1Yj1mJTNBYmIwNzNlMzItNDM4NC00MTUzLWFkNWMtMTgzYWViZDYzZWM2JTNBMTM3NTI5NDYyOCZrZXk9aHJtN3VlOHBXekVNJmtwc191cmw9Jmxhbmd1YWdlPWZyJmxhc3RfbmFtZT1NaWFyYSZsb2NhbGU9ZnJfZnImbG9naW49MSZtZXJraXRlbXM9MCZwa2lkc19pbl9jYXJ0PSZwcmljZT0wLjAwJnByaWNlX2Zvcm1hdHRlZD0wJTJDMDAmcmFuZG9tPTg3NDAyJnJhcD0wJnJlZmVyZXI9aHR0cHMlM0ElMkYlMkZ0aWNrZXRzLnBhcmlzMjAyNC5vcmclMkZzZWFyY2glMkYlM0ZhZmZpbGlhdGUlM0QyNFImcmVzZXJ2YXRpb25fZHVyYXRpb249MCZ0aWNrZXRhbW91bnRfcHJpY2VzX3BraWQ9JnRva2VuPVZXV1pRUVlWSkJHS09BVg==; SameSite=None; 24A.webid=MjRBX05PX1NFU1NJT05fRlI=; 24A.webshop=bG9naW49MCZldm9fbXljbHVic19tZW1iZXI9JnByaWNlPTAuMDAmYW1vdW50PTAmbWVya2l0ZW1zPTAmcmVzZXJ2YXRpb25fZHVyYXRpb249MCZrcHNfdXJsPSZhbW91bnRfZXZpZHM9MCZwa2lkc19pbl9jYXJ0PSZldmlkc19pbl9jYXJ0PSZ0aWNrZXRhbW91bnRfcHJpY2VzX3BraWQ9JnJhbmRvbT0yNzQ1MyZyZWZlcmVyPSZrZXk9aldHRHZFZG1LQ0pVJmRldmljZV9pbmZvPTAmbGFuZ3VhZ2U9ZnImbG9jYWxlPWZyX2ZyJnByaWNlX2Zvcm1hdHRlZD0wJTJDMDAmY3VycmVuY3lfY29kZT1FVVImY3VycmVuY3lfc3ltYm9sPSUyNmV1cm8lM0ImdG9rZW49UlJRQlRFQkVGTlRQSElW; _dc_gtm_UA-78684294-121=1; ADRUM_BTa=R:51|g:d8f9e580-e168-4d5c-ae78-9172b67d00db|n:customer1_3aa627d9-4de0-48ca-a644-db85ae91343a; ADRUM_BT1=R:51|i:2496|e:117; _ga=GA1.2.1393896297.1696169233; _scid_r=a5abec9f-738f-401a-94da-b988c1b5caf3; bm_sv=2EF630E55FD8939E77E4CBD9968AB3BA~YAAQNQ0VAiRe+WqLAQAA6+vQaxXBAlIFxV/YBVxHw0SXhQs6maGY8t0AJBlCwdgQIzk2zLhlpypCogzMQDD0Tk3zmiggL6tjBfJ4/whqtUeOzI47IouCGV2fL6SWzoPf9IzqOcpl/3Bdqt+LNKfhjzKgNjiyRmhoqiw1bOu3OoseXyblCq13hEr2F1STGK7ej0CpAVvoMlFn5J0xIRm9fhl4eyqHcVMZQ0IvIOQrf+S8VVLUnyLDCBKtcEmR5GduNkCuNA==~1; _ga_J21KVL22SE=GS1.1.1698304242.5.1.1698320944.0.0.0; __trossion=1694284540_1800_12_c5ecdf66-13ad-491b-be5d-bec29cae849a%3A1698307544_c5ecdf66-13ad-491b-be5d-bec29cae849a%3A1698320827_1698320944_8_',
    'Referer': 'https://tickets.paris2024.org/event/football-stade-de-lyon-15782675/?affiliate=24R',
    'sec-ch-ua': 'Chromium";v="118", "Microsoft Edge";v="118", "Not=A?Brand";v="99',
    'sec-ch-ua-mobile': '?O',
    'sec-ch-ua-platform': 'Windows',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61',
    'X-Requested-With': 'XMLHttpRequest',
}

const params1 = {
    affiliate: "24R",
    token: 'VWWZQQYVJBGKOAV',
    evid: '15782675'
}
const params2 = {
    affiliate: "24R"
}

const body = {
    eventId:"15782675",
    timestamp:1698313852513,
    ticketPriceIds:{"99534962":12494},
    ttIdToCustomVoucherValue:{},
    addBestSeatJson:{"requestedBestSeats":[{"ticketTypeId":"99534962","combinedTicketTypeRuleId":"0","amount":"1"}]},
    backToPrevPage:"/event/football-stade-de-lyon-15782675/?affiliate=24R",
    pkId:"30882442",
    promotionId:"0"
}

axios.post(url, body, {
    headers: headers1,
    params: params1
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Erreur lors de la requête:', error);
});

axios.get(url, {
    headers: headers2,
    params: params2
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Erreur lors de la requête:', error);
});