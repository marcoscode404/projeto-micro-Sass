docker:
	docker compose build
	docker compose down
	docker compose up

install:
	pnpm install

run:
	pnpm dev --host

build:
	pnpm generate

serve:
	pnpm generate
	pnpm preview

commit:
	git add .
	git commit
	