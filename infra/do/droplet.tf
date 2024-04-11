resource "digitalocean_droplet" "docker-droplet" {
    image = "debian-12-x64"
    name = "docker-droplet"
    region = "sfo3"
    size = "s-1vcpu-512mb-10gb"
    tags = ["docker", "droplet"]
    ssh_keys = [
      data.digitalocean_ssh_key.mj-sandbox.id
    ]

  provisioner "remote-exec" {
    inline = ["echo Done!"]

    connection {
      host        = self.ipv4_address
      type        = "ssh"
      user        = "root"
      private_key = file(var.pvt_key)
    }
  }

  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u root -i '${self.ipv4_address},' --private-key ${var.pvt_key} -e 'pub_key=${var.pub_key}' ansible/wait-for-init.yml"
  }

  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u root -i '${self.ipv4_address},' --private-key ${var.pvt_key} -e 'pub_key=${var.pub_key}' ansible/install-docker.yml"
  }

  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u root -i '${self.ipv4_address},' --private-key ${var.pvt_key} -e 'pub_key=${var.pub_key}' ansible/run-compose-file.yml"
  }

}

output "droplet" {
  value = digitalocean_droplet.docker-droplet
}

