# Grocer-easy: Shopping list generator and nutritional information calculator
Application that displayed a list of recipes from an API, which users could add/remove all the ingredients of a meal to a shopping list with a single click. The items in the shopping list had their nutritional values (calories, protein, fat etc.) retrieved from a second API. The application generated warnings based on high levels of sodium, cholesterol and sugar in the users shopping list.

The application was deployed to AWS through a Docker container. The application had a page counter that was stored and incrimented through an AWS S3 Bucket.

**Unfortunately, the application is no longer functioning without refactoring due to AWS credentials no longer available.**

### Original Instructions
1. Connect to an AWS ec2 instance

2. docker pull mwithe/grocer-easy

3. docker run -p 8000:8000 -i --rm -e API_KEY1=xxx -e API_KEY2=xxx mwithe/grocer-easy

4. Go to ec2 ipv4:8000
Example: (23.12.55.94:8000)

### Images
![2](https://github.com/mwithe/grocer-easy/assets/112362724/892538e1-6dc7-4e3b-8820-1eb7916d61a1)

![1](https://github.com/mwithe/grocer-easy/assets/112362724/45bb54b7-1013-4050-8558-aba44bcc2f98)

![3](https://github.com/mwithe/grocer-easy/assets/112362724/e52b8dbb-a8b2-4f28-b4c5-ef9c499cc538)
