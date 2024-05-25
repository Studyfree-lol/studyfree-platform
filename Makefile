export MEILI_MASTER_KEY=VERY_SECRET_TOKEN

.PHONY: all
gen-meili-apikey:
	curl -X POST "http://localhost:7700/keys?limit=3" \
		-H "Authorization: Bearer $(MEILI_MASTER_KEY)" \
		-H "Content-Type: application/json" \
		--data-binary '{ \
    	    "description": "Test API Key", \
    	    "actions": ["search"], \
    	    "indexes": ["courses", "universities"], \
    	    "expiresAt": "2042-04-02T00:42:42Z" \
    	  }'

up:
	docker-compose up

deps:
	docker-compose up -d postgres minio meilisearch

be:
	docker-compose up -d postgres minio meilisearch backend --build --force-recreate

dev-be:
	cd apps/backend && go run main.go

dev-fe:
	cd apps/frontend && pnpm dev
