{
	"info": {
		"_postman_id": "f4675b76-dcdc-4b93-a861-fe8b05c500b3",
		"name": "NTV Connection",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/s3/createpresigned",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Y29kZSI6IkEwMDAwMDAyIiwibWFpbCI6InZuQHNhaXNzaHVua2Fuc3lzLmNvbSIsInVzZXJuYW1lIjoic3N2IiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ0eXBlIjo5LCJpYXQiOjE2NDE5NzQzMTgsImV4cCI6MTY0MjU3OTExOH0.HcZn9-xJm5Xq6ESfQD2JRUDGFllbIPFS9dPKA4SGnAI",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [
					{
						"key": "x-api-key",
						"value": "rjewp^augexvopbmIszdyh7gfibmu.Sw",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"file\": \"Pha xử lý IQ 1000 của LongKhatMau.mp4\",\r\n    \"sizefile\": 1024000\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/s3/createpresigned",
					"protocol": "https",
					"host": [
						"smkoyksapf",
						"execute-api",
						"ap-northeast-1",
						"amazonaws",
						"com"
					],
					"path": [
						"staging",
						"v1",
						"api",
						"s3",
						"createpresigned"
					]
				}
			},
			"response": []
		},
		{
			"name": "https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/company/login",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "x-api-key",
						"value": "rjewp^augexvopbmIszdyh7gfibmu.Sw",
						"type": "string"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"companycode\": \"A0000002\",\r\n    \"username\": \"ssv\",\r\n    \"password\": \"Ssv@1234\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://smkoyksapf.execute-api.ap-northeast-1.amazonaws.com/staging/v1/api/company/login",
					"protocol": "https",
					"host": [
						"smkoyksapf",
						"execute-api",
						"ap-northeast-1",
						"amazonaws",
						"com"
					],
					"path": [
						"staging",
						"v1",
						"api",
						"company",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "https://ntvlibrary-20211227.s3.ap-northeast-1.amazonaws.com/source/A0000002/20220105/TFA7aDE844NOs0qa.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIARNKEBY76QKIQPBAU%2F20220105%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220105T041757Z&X-Amz-Expires=3600&X-Amz-Signature=22b3f954faca7f602439ac5c45c847a83c3136f1a3e46f2efe7d8018f7e52be9&X-Amz-SignedHeaders=content-length%3Bhost&x-id=PutObject",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "file",
					"file": {
						"src": ""
					}
				},
				"url": {
					"raw": "https://ntvlibrary-20211227.s3.ap-northeast-1.amazonaws.com/source/A0000002/20220105/TFA7aDE844NOs0qa.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIARNKEBY76QKIQPBAU%2F20220105%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220105T041757Z&X-Amz-Expires=3600&X-Amz-Signature=22b3f954faca7f602439ac5c45c847a83c3136f1a3e46f2efe7d8018f7e52be9&X-Amz-SignedHeaders=content-length%3Bhost&x-id=PutObject",
					"protocol": "https",
					"host": [
						"ntvlibrary-20211227",
						"s3",
						"ap-northeast-1",
						"amazonaws",
						"com"
					],
					"path": [
						"source",
						"A0000002",
						"20220105",
						"TFA7aDE844NOs0qa.mp4"
					],
					"query": [
						{
							"key": "X-Amz-Algorithm",
							"value": "AWS4-HMAC-SHA256"
						},
						{
							"key": "X-Amz-Content-Sha256",
							"value": "UNSIGNED-PAYLOAD"
						},
						{
							"key": "X-Amz-Credential",
							"value": "AKIARNKEBY76QKIQPBAU%2F20220105%2Fap-northeast-1%2Fs3%2Faws4_request"
						},
						{
							"key": "X-Amz-Date",
							"value": "20220105T041757Z"
						},
						{
							"key": "X-Amz-Expires",
							"value": "3600"
						},
						{
							"key": "X-Amz-Signature",
							"value": "22b3f954faca7f602439ac5c45c847a83c3136f1a3e46f2efe7d8018f7e52be9"
						},
						{
							"key": "X-Amz-SignedHeaders",
							"value": "content-length%3Bhost"
						},
						{
							"key": "x-id",
							"value": "PutObject"
						}
					]
				}
			},
			"response": []
		}
	]
