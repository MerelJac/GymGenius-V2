module "droplet" {
  source       = "../do/droplet"
}

resource "null_resource" "ConfigureAnsibleLabelVariable" {
  provisioner "local-exec" {
    command = "echo HELLO_WORLD"
  }

  provisioner "local-exec" {
    command = "echo ${droplet.ipv4_address}"
  }

}

output "droplet" {
  value = droplet
}
