FROM scratch
COPY server /
COPY cmd/server/ /
CMD ["/server"]