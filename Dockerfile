FROM progrium/busybox
RUN opkg-install ca-certificates
MAINTAINER Francesco Ferraro <francescoaferraro@gmail.com>
ADD www/ www
ADD dist/spotify spotify
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["/spotify"]